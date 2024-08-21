import { Module } from '@nestjs/common';
import { ProductController } from "./usecases/product.controller";


@Module({
    imports: [],
    controllers: [ProductController],
    providers:[]
})

export class ProductModule {}
