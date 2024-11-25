import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IProductRepository } from '../../repositories/product.repository';
import { AppUserDetailsUsecase } from 'src/core/modules/AppUser/usecases/app-user.usecase';
@Injectable()
export class FindBusinessProductsUsecaseByAppUser {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly appUserUsecase: AppUserDetailsUsecase,
  ) {}

  async execute(businessInfoUuid: string, appUserUuid: string) {
    const appUserDetails = await this.appUserUsecase.getAppUser(appUserUuid);
    if (!appUserDetails) throw new UnauthorizedException();
    //find business products
    const products =
      await this.productRepository.findBusinessProducts(businessInfoUuid);

    return products.map((product) => ({
      uuid: product.uuid.uuid,
      category_uuid: product.category_uuid.uuid,
      brand: product.brand,
      name: product.name,
      description: product.description,
      original_price: product.original_price / 100,
      discount: product.discount / 100,
      promotional_price: product.promotional_price / 100,
      weigth: product.weigth,
      height: product.height,
      width: product.width,
      created_at: product.created_at,
    }));
  }
}
