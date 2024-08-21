import { Injectable } from "@nestjs/common";
import { ICategoriesRepository } from "../../repositories/categories.repository";
import { InputFindCategoryDTO } from "./dto/find-category.dto";

@Injectable()
export class FindCategoryUsecase{
    constructor(private categoryRepository: ICategoriesRepository){}

    async execute(data: InputFindCategoryDTO){
        
    }
}