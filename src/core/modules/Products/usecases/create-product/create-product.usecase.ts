import { Injectable } from '@nestjs/common';
import { InputCreateProductDTO } from './dto/create-product.dto';
import { IStorage } from 'src/core/infra/providers/storage/storage';
// import { IProductRepository } from '../../repositories/product.repository';
import { extname } from 'path';
@Injectable()
export class CreateProductUsecase {
  constructor(private storage: IStorage) {}

  async execute(data: InputCreateProductDTO) {
    const extFile = extname(data.file.originalname);
    const transformName = `${data.business_user_uuid}${extFile}`;
    data.file.originalname = transformName;
    console.log('data em product usecase: ', data);
    const file = await this.storage.upload(data.file, 'image');
    console.log({ file });
    return file;
  }
}
