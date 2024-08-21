import { Module } from '@nestjs/common';
import { CategoryModule } from './core/modules/Categories/category.module';
import { ProductModule } from './core/modules/Products/product.module';

@Module({
  imports: [CategoryModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
