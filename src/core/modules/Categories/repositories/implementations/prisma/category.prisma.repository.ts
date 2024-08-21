/* eslint-disable prettier/prettier */
import { PrismaService} from 'src/core/infra/databases/prisma.config';
import { Uuid } from '../../../../../@shared/ValueObjects/uuid.vo';
import { CategoryEntity } from '../../../entities/categories.entity';
import { ICategoriesRepository } from '../../categories.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesPrismaRepository implements ICategoriesRepository {

  constructor(private prisma: PrismaService){}

  async findByName(name: string): Promise<CategoryEntity | null> {
    const category = await this.prisma.categories.findFirst({
      where: {
        name,
      },
    });

    if(!category) return null
    return {
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
      updated_at: category.updated_at,
    } as CategoryEntity
  }
  async create(entity: CategoryEntity): Promise<void> {
    await this.prisma.categories.create({
      data:{
        uuid: entity.uuid.uuid,
        name: entity.name,
        description: entity.description,
        is_active: entity.is_active,
        created_at: entity.created_at
      }
    })
  }
  async update(entity: CategoryEntity): Promise<void> {
    await this.prisma.categories.update({
      where:{
        uuid: entity.uuid.uuid
      },
      data:{
        name: entity.name,
        description: entity.description,
        updated_at: entity.updated_at
      }
    })
  }
  async find(uuid: string): Promise<CategoryEntity | null> {
    const category = await this.prisma.categories.findUnique({
      where: {
        uuid,
      },
    });

    if(!category) return null
    return {
      uuid: new Uuid(category.uuid),
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
      updated_at: category.updated_at,
    } as CategoryEntity
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.prisma.categories.findMany();
    console.log({categories})
    return categories.map(category => ({
      uuid: new Uuid(category.uuid),
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
      updated_at: category.updated_at,
    })) as CategoryEntity[];
  }
}
