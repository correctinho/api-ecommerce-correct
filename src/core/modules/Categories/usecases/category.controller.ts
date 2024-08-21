/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryUsecase } from './createCategory/create-category.usecase';
import { InputCreateCategoryDTO } from './createCategory/dto/create-category.dto';

@Controller('/categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUsecase: CreateCategoryUsecase
  ){}

  @Post()
  async create(@Body() data: InputCreateCategoryDTO){
    return await this.createCategoryUsecase.execute(data)
  }
}
