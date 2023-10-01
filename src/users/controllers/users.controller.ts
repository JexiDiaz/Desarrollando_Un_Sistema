import { Controller,
    Post,
     Body, 
     Get, 
     Param,
     ParseIntPipe,
     Delete, 
     Patch,
     } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUsersDto } from '../dto/users.dto';

 
 
 @Controller('users')
 export class UsersController {
   constructor(private readonly UsersServices: UsersService) {}
 
   @Post()
   async create(@Body() usersDto: CreateUsersDto ) {
     return await this.UsersServices.create(usersDto);
   }

   @Get() //Este seria para encontrar todo el servicio
   findAll() { //Este seria para encontrar un servicio
     return this.UsersServices.findAll();
   }
 
   @Get(':id')
   finOne( @Param('id', ParseIntPipe)  id: number) {
     return this.UsersServices.findOne(id);
   }
    //El param se utiliza para cuando estamos tocando los campos de la base de datos
 
   @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: number) {
    return this.UsersServices.remove(id);
   }
 
   //El metodo Patch actualiza parcialmente, solamente lo necesario
   // Los pipes son transformadores, transforman la data
   @Patch(':id')
   update( 
     @Param('id', ParseIntPipe) id: number,
     @Body() createUsersDto:CreateUsersDto, 
     ) {
       return this.UsersServices.update(id,createUsersDto)
     }
   }
 