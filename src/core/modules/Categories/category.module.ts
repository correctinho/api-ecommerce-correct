/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoryController } from './usecases/category.controller';
import { CreateCategoryUsecase } from './usecases/createCategory/create-category.usecase';
import { PrismaService } from '../../infra/databases/prisma.config';
import { CategoriesPrismaRepository } from './repositories/implementations/prisma/category.prisma.repository';
import { ICategoriesRepository } from './repositories/categories.repository';
import { CorrectAdminDetailsModule } from '../CorrectAdmin/correct-admin-details.module';
import { FindCategoryUsecase } from './usecases/findCategory/find-category.usecase';
import { FindAllCategoryUsecase } from './usecases/findAllCategories/find-all-categories.usecase';
import { BusinessUserDetailsModule } from '../BusinessUser/business-user-details.module';
@Module({
  imports: [CorrectAdminDetailsModule, BusinessUserDetailsModule],
  controllers: [CategoryController],
  providers: [CreateCategoryUsecase, FindCategoryUsecase, FindAllCategoryUsecase, PrismaService,
    {
      provide: ICategoriesRepository,
      useClass: CategoriesPrismaRepository
    }],
})

export class CategoryModule { }
