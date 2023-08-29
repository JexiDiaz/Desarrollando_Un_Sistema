import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
    

    export class CreateUsersDto {
        @IsNotEmpty()
        @IsNumber()
        id: number;
         

        @IsString()
        @IsNotEmpty()
        @MaxLength(100)
        name: string;

        @IsString()
        @IsNotEmpty()
        @MaxLength(300)
        password: string;


        @IsString()
        @IsNotEmpty()
        @MaxLength(300)
        email: string;

        @IsString()
        @IsNotEmpty()
        @MaxLength(200)
        sexo: string;

        @IsString()
        @IsNotEmpty()
        @MaxLength(300)
        active:  boolean;

        @IsNumber()
        @IsNotEmpty()
        stock: number;


    }