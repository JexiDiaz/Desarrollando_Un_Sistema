import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
    

    export class CreateProductDto {
        @IsNotEmpty()
        @IsNumber()
        id?: number;
        // LOS DECORADORES EN EL DTO VALIDA QUE LA INFORM QUE SE AGREGUE SEA LA CORRECTA 

        @IsString()
        @IsNotEmpty()
        @MaxLength(100)
        name: string;

        @IsString()
        @IsNotEmpty()
        @MaxLength(300)
        description: string;

        @IsNumber()
        @IsNotEmpty()
        price: number;

        @IsNumber()
        @IsNotEmpty()
        stock: number;

        @IsString()
        @IsOptional()
        filename: string;

        @IsDateString()
        @IsOptional()
        created_at: string;

        @IsNumber()
        @IsNotEmpty()
        categoria_id: number;

        @IsNumber()
        @IsNotEmpty()
        proveedor_id: number;
        
        //El images en el string lleva [] porque es un arreglo
        @IsArray({ each: true })
        @IsString()
        @IsOptional()
        images?: string[];

    }

