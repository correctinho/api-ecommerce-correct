import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/core/infra/providers/auth-guard.provider';
import {
  FileDTO,
  InputCreateProductDTO,
} from './create-product/dto/create-product.dto';
import { CreateProductUsecase } from './create-product/create-product.usecase';

@Controller('/product')
export class ProductController {
  constructor(private createProductUsecase: CreateProductUsecase) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() data: InputCreateProductDTO,
    @Request() req,
    @UploadedFile() file: FileDTO,
  ) {
    data.business_user_uuid = req.user.data.user_uuid;
    data.file = file;
    console.log({data})
    const usecase = await this.createProductUsecase.execute(data);
    console.log({ usecase });
    return usecase;
  }
}
