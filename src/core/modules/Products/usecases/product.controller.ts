import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  FileDTO,
  InputCreateProductDTO,
} from './create-product/dto/create-product.dto';
import { CreateProductUsecase } from './create-product/create-product.usecase';
import { AuthGuardBusiness } from '../../../infra/providers/auth-guard-business.provider';

@Controller('/product')
export class ProductController {
  constructor(private createProductUsecase: CreateProductUsecase) {}

  @Post()
  @UseGuards(AuthGuardBusiness)
  @UseInterceptors(FilesInterceptor('file', 4))
  async create(
    @Body() data: InputCreateProductDTO,
    @Request() req,
    @UploadedFiles() files: FileDTO[],
  ) {
    data.business_user_uuid = req.user.uuid;
    data.uploaded_images = files;
    const product = await this.createProductUsecase.execute(data);
    return product;
  }
}
