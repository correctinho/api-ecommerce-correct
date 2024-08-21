import { Module } from '@nestjs/common';
import { CategoryModule } from './core/modules/Categories/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
