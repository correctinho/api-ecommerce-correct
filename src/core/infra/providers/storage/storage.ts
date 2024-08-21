import { FileDTO } from 'src/core/modules/Products/usecases/create-product/dto/create-product.dto';

export abstract class IStorage {
  abstract upload(file: FileDTO, folder: string): Promise<any>;
}
