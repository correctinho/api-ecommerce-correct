import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InputCreateProductDTO } from './dto/create-product.dto';
import { IStorage } from '../../../../infra/providers/storage/storage';
// import { IProductRepository } from '../../repositories/product.repository';
import { extname } from 'path';
import { BusinessUserDetailsUsecase } from '../../../BusinessUser/usecases/business-user.usecase';

import { ProductEntity } from '../../entities/products.entity';
import { Uuid } from '../../../../@shared/ValueObjects/uuid.vo';
import { IProductRepository } from '../../repositories/product.repository';
@Injectable()
export class CreateProductUsecase {
  constructor(
    private storage: IStorage,
    private readonly businessUserUsecase: BusinessUserDetailsUsecase,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(data: InputCreateProductDTO) {
    const businessUserDetails: any =
      await this.businessUserUsecase.getBusinessUser(data.business_user_uuid);
    if (!businessUserDetails) throw new UnauthorizedException();

    const dataEntity = {
      ...data,
      original_price: +data.original_price,
      promotional_price: +data.promotional_price,
      discount: +data.discount,
      stock: +data.stock,
      is_mega_promotion: data.is_mega_promotion === 'true' ? true : false,
      category_uuid: data.category_uuid && new Uuid(data.category_uuid),
      business_info_uuid: new Uuid(businessUserDetails.businessInfoUuid),
    };

    const productEntity = ProductEntity.create(dataEntity);

    const paths: string[] = [];

    if (productEntity.api_image) {
      paths.push(productEntity.api_image);
    }

    console.log({ productEntity });

    if (data.uploaded_images.length > 0) {
      for (const image of data.uploaded_images) {
        const extFile = extname(image.originalname);

        const transformName = `${data.business_user_uuid}-${Date.now()}-${Math.random().toString(36).substring(7)}${extFile}`;

        image.originalname = transformName;
        const uploaded = await this.storage.upload(image, 'image');

        const pathImage = uploaded.data.path;
        paths.push(pathImage);
      }
    }

    productEntity.changeImagesUrl(paths);

    try {
      const product = await this.productRepository.upsert(productEntity);
      return {
        uuid: product.uuid.uuid,
        category_uuid: product.category_uuid.uuid,
        ean_code: product.ean_code,
        name: product.name,
        description: product.description,
        original_price: product.original_price,
        discount: product.discount,
        promotional_price: product.promotional_price,
        stock: product.stock,
        api_image: product.api_image,
        uploaded_images: product.uploaded_images,
        is_active: product.is_active,
        created_at: product.created_at,
      };
    } catch (error) {
      for (const imagePath of productEntity.images_url) {
        await this.storage.delete(imagePath);
      }

      throw new HttpException('Error saving product', HttpStatus.BAD_REQUEST);
    }
  }
}
