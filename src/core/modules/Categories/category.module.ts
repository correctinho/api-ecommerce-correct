/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoryController } from './usecases/category.controller';
import { CreateCategoryUsecase } from './usecases/createCategory/create-category.usecase';
import { PrismaService } from 'src/core/infra/databases/prisma.config';
import { CategoriesPrismaRepository } from './repositories/implementations/prisma/category.prisma.repository';
import { ICategoriesRepository } from './repositories/categories.repository';
@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CreateCategoryUsecase, PrismaService,
    {
      provide: ICategoriesRepository,
      useClass: CategoriesPrismaRepository
    }],
})

export class CategoryModule { }
