import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../product.repository';
import { PrismaService } from '../../../../infra/databases/prisma.config';
import { ProductEntity } from '../../entities/products.entity';
import { Uuid } from '../../../../@shared/ValueObjects/uuid.vo';

@Injectable()
export class ProductPrismaRepository implements IProductRepository {
  constructor(private prisma: PrismaService) {}

  create(entity: ProductEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(entity: ProductEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(id: string): Promise<ProductEntity> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<ProductEntity[]> {
    throw new Error('Method not implemented.');
  }
  async upsert(entity: ProductEntity): Promise<ProductEntity> {
    console.log({ entity });
    const product = await this.prisma.products.upsert({
      where: {
        uuid: entity.uuid.uuid,
      },
      create: {
        uuid: entity.uuid.uuid,
        category_uuid: entity.category_uuid.uuid,
        ean_code: entity.ean_code,
        brand: entity.brand,
        name: entity.name,
        description: entity.description,
        original_price: entity.original_price,
        promotional_price: entity.promotional_price,
        discount: entity.discount,
        image_urls: entity.images_url,
        is_mega_promotion: entity.is_mega_promotion,
        stock: entity.stock,
        weight: entity.weight,
        height: entity.height,
        width: entity.width,
        business_info_uuid: entity.business_info_uuid.uuid,
        created_at: entity.created_at,
      },
      update: {
        category_uuid: entity.category_uuid.uuid,
        ean_code: entity.ean_code,
        brand: entity.brand,
        name: entity.name,
        description: entity.description,
        original_price: entity.original_price,
        promotional_price: entity.promotional_price,
        discount: entity.discount,
        image_urls: entity.images_url,
        is_mega_promotion: entity.is_mega_promotion,
        stock: entity.stock,
        weight: entity.weight,
        height: entity.height,
        width: entity.width,
        updated_at: entity.updated_at,
      },
    });

    return {
      uuid: new Uuid(product.uuid),
      category_uuid: new Uuid(product.category_uuid),
      business_info_uuid: new Uuid(product.business_info_uuid),
      ean_code: product.ean_code,
      brand: product.brand,
      name: product.name,
      description: product.description,
      original_price: product.original_price,
      discount: product.discount,
      promotional_price: product.promotional_price,
      stock: product.stock,
      images_url: product.image_urls,
      is_mega_promotion: product.is_mega_promotion,
      is_active: product.is_active,
      weight: product.weight,
      height: product.height,
      width: product.width,
      created_at: product.created_at,
      updated_at: product.updated_at,
    } as ProductEntity;
  }
}
