import { Module } from '@nestjs/common';
import { CategoryModule } from './core/modules/Categories/category.module';
import { ProductModule } from './core/modules/Products/product.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CategoryModule,
    ProductModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
