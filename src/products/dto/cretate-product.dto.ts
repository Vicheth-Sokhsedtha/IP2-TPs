import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}