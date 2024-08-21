import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICategoriesRepository } from '../../repositories/categories.repository';
import {
  InputFindCategoryDTO,
  OutputFindCategoryDTO,
} from './dto/find-category.dto';

@Injectable()
export class FindCategoryUsecase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute(data: InputFindCategoryDTO): Promise<OutputFindCategoryDTO> {
    if (!data.uuid) {
      throw new HttpException('UUID is required', HttpStatus.BAD_REQUEST);
    }
    const findCategory = await this.categoryRepository.find(data.uuid);
    if (!findCategory)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);

    return {
      uuid: findCategory.uuid.uuid,
      name: findCategory.name,
      description: findCategory.description,
      created_at: findCategory.created_at,
      updated_at: findCategory.updated_at,
    };
  }
}
