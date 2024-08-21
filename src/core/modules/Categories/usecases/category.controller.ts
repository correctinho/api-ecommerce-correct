/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateCategoryUsecase } from './createCategory/create-category.usecase';
import { InputCreateCategoryDTO } from './createCategory/dto/create-category.dto';
import { AuthGuard } from 'src/core/infra/providers/auth-guard.provider';
import { FindCategoryUsecase } from './findCategory/find-category.usecase';
import { InputFindCategoryDTO } from './findCategory/dto/find-category.dto';
import { FindAllCategoryUsecase } from './findAllCategories/find-category.usecase';

@Controller('/categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUsecase: CreateCategoryUsecase,
    private readonly findCategoryUsecase: FindCategoryUsecase,
    private readonly findAllCateogoriesUseacase: FindAllCategoryUsecase
  ){}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() data: InputCreateCategoryDTO, @Request() req){
    data.correct_admin_uuid = req.user.data.user_uuid
    return await this.createCategoryUsecase.execute(data)
  }
  @Get('/all')
  async findAll(){
    return await this.findAllCateogoriesUseacase.execute()
  }

  @Get('/:uuid')
  async find(@Param() data: InputFindCategoryDTO){
    return await this.findCategoryUsecase.execute(data)
  }

}
