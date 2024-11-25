import { Module } from '@nestjs/common';
import { ProductController } from './usecases/product.controller';
import { CreateProductUsecase } from './usecases/create-product/create-product.usecase';
import { PrismaService } from '../../infra/databases/prisma.config';
import { IStorage } from '../../infra/providers/storage/storage';
import { SupabaseStorage } from '../../infra/providers/storage/supabase.storage';
import { BusinessUserDetailsModule } from '../BusinessUser/business-user-details.module';
import { IProductRepository } from './repositories/product.repository';
import { ProductPrismaRepository } from './repositories/prisma/product-prisma.repository';
import { AppUserDetailsModule } from '../AppUser/app-user-details.module';
import { FindBusinessProductsUsecaseByAppUser } from './usecases/find-business-products/find-business-product.usecase';

@Module({
  imports: [BusinessUserDetailsModule, AppUserDetailsModule],
  controllers: [ProductController],
  providers: [
    CreateProductUsecase,
    FindBusinessProductsUsecaseByAppUser,
    PrismaService,
    {
      provide: IStorage,
      useClass: SupabaseStorage,
    },
    {
      provide: IProductRepository,
      useClass: ProductPrismaRepository,
    },
  ],
})
export class ProductModule {}
