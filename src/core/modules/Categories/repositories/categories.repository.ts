import { RepositoryInterface } from '../../../@shared/domain/repository/repository-interface';
import { CategoryEntity } from '../entities/categories.entity';

export abstract class ICategoriesRepository
  extends RepositoryInterface<CategoryEntity> {
    abstract findByName(name: string): Promise<CategoryEntity | null>;
}
