import { IsNumber, IsString, Min } from "class-validator";

export class UpdateProductDto {

    @IsNumber()
    @Min(0) // Assuming id should be a positive number
    id?: number;

    @IsString()
    name?: string;

    @IsNumber()
    @Min(0)
    price?: number;

    @IsNumber()
    @Min(0) // Assuming categoryId should be a positive number
    categoryId?: number;
}