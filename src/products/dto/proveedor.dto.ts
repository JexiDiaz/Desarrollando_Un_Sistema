import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
    

    export class CreateProveedorDto {
        @IsNotEmpty()
        @IsNumber()
        id?: number;
       
        @IsString()
        @IsNotEmpty()
        @MaxLength(100)
        proveedor: string;

        @IsNotEmpty()
        @IsNumber()
        user_id: number;

        @IsDateString()
        @IsOptional()
        created_at: Date;

    }