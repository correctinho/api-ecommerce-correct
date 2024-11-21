import { RepositoryInterface } from '../../../@shared/domain/repository/repository-interface';

import { ProductEntity } from '../entities/products.entity';

export abstract class IProductRepository extends RepositoryInterface<ProductEntity> {
  abstract upsert(entity: ProductEntity): Promise<ProductEntity>;
}
