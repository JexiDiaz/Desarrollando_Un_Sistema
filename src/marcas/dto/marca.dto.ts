
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';


    export class CreateMarcasDto{
        @IsNotEmpty()
        @IsNumber()
        id?: number;
        // LOS DECORADORES EN EL DTOVALIDAD QUE LA INFO QUE SE AGREGUE SEA LA CORRECTA 

        @IsString()
        @IsNotEmpty()
        @MaxLength(100)
        Marca: string;

        @IsNumber()
        @IsNotEmpty()
        user_id: number;

        

    }