import { Module } from '@nestjs/common';
import { ProductController } from './usecases/product.controller';
import { CreateProductUsecase } from './usecases/create-product/create-product.usecase';
import { PrismaService } from 'src/core/infra/databases/prisma.config';
import { IStorage } from 'src/core/infra/providers/storage/storage';
import { SupabaseStorage } from 'src/core/infra/providers/storage/supabase.storage';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    CreateProductUsecase,
    PrismaService,
    {
      provide: IStorage,
      useClass: SupabaseStorage,
    },
  ],
})
export class ProductModule {}
