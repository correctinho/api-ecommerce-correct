import{ RepositoryInterface} from "../../../@shared/domain/repository/repository-interface";
import { EcommerceAddressEntity  } from "../entities/ecommerceAddress.entity";

export interface IEcommerceAddressRepository extends RepositoryInterface<EcommerceAddressEntity>{}