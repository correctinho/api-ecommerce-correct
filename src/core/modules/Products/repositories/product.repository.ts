import { RepositoryInterface } from 'src/core/@shared/domain/repository/repository-interface';
import { ProductEntity } from '../entities/products.entity';

export abstract class IProductRepository extends RepositoryInterface<ProductEntity> {}
