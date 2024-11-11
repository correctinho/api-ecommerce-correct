import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICategoriesRepository } from '../../repositories/categories.repository';
import { OutputFindCategoryDTO } from '../findCategory/dto/find-category.dto';

@Injectable()
export class FindAllCategoryUsecase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute(): Promise<OutputFindCategoryDTO[]> {
    const findAllCategories = await this.categoryRepository.findAll();
    if (findAllCategories.length === 0) {
      throw new HttpException('Categories not found', HttpStatus.NOT_FOUND);
    }
    return findAllCategories.map((category) => ({
      uuid: category.uuid.uuid,
      name: category.name,
      description: category.description,
      created_at: category.created_at,
      updated_at: category.updated_at,
    }));
  }
}
