/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InputCreateCategoryDTO, OutputCreateCategoryDTO } from './dto/create-category.dto';
import { ICategoriesRepository } from '../../repositories/categories.repository';
import { CustomError } from 'src/core/errors/custom.error';
import { CategoryEntity } from '../../entities/categories.entity';
import { CorrectAdminDetailsUsecase } from 'src/core/modules/CorrectAdmin/usecases/correct-admin.usecase';

@Injectable()
export class CreateCategoryUsecase {
  constructor(
    private categoryRepository: ICategoriesRepository,
    private readonly correctAdminUsecase: CorrectAdminDetailsUsecase
  ){}

  async execute(data: InputCreateCategoryDTO):Promise<OutputCreateCategoryDTO> {
    const categoryEntity = CategoryEntity.create(data)
    //aqui deve ser feita uma requisição a api de usuários
    const adminDetails = await this.correctAdminUsecase.getCorrectAdmin(data.correct_admin_uuid)
    if(!adminDetails) throw new UnauthorizedException();
    //check if name is already registered
    const categoryByName = await this.categoryRepository.findByName(categoryEntity.name)
    if(categoryByName) throw new CustomError("Category name already registered", 409)
    //create
    await this.categoryRepository.create(categoryEntity)

    return {
      uuid: categoryEntity.uuid.uuid,
      name: categoryEntity.name,
      description: categoryEntity.description,
      created_at: categoryEntity._created_at
    }


  }
}
