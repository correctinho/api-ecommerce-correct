import { Body, Controller, Post } from "@nestjs/common";

@Controller('/product')
export class ProductController {
    constructor(){}

    @Post()
    async create(@Body() data: any){
        
    }
}