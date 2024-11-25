import {
  Body,
  Controller,
  Get,
  Post,
  Query,
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
import { AuthGuardAppUser } from 'src/core/infra/providers/auth-guard-app-user.provider';
import { FindBusinessProductsUsecaseByAppUser } from './find-business-products/find-business-product.usecase';
import { InputFindBusinessProductDTO } from './find-business-products/dto/find-business-products.dto';

@Controller('/products')
export class ProductController {
  constructor(
    private createProductUsecase: CreateProductUsecase,
    private findBusinessProductsUsecase: FindBusinessProductsUsecaseByAppUser,
  ) {}

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
  @Get('business')
  @UseGuards(AuthGuardAppUser)
  async findBusinessProductsByAppUser(
    @Query() data: InputFindBusinessProductDTO,
    @Request() req,
  ) {
    const appUserUuid = req.user.uuid;
    const products = await this.findBusinessProductsUsecase.execute(
      data.business_info_uuid,
      appUserUuid,
    );
    return products;
  }
}
