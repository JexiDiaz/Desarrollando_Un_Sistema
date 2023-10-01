import { Controller,
    Post,
     Body, 
     Get, 
     Param,
     ParseIntPipe,
     Delete, 
     Patch,
     } from '@nestjs/common';
 import { ProductsService } from '../services/product.service';
 import { CreateProductDto } from '../dto/product.dto';
 
 
 @Controller('products')
 export class ProductsController {
   constructor(private readonly productsServices: ProductsService) {}
 
   @Post()
   async create(@Body() productDto: CreateProductDto) {
     return await this.productsServices.create(productDto);
   }
  
   @Get() //Este seria para encontrar todo el producto
   findAll() { //Este seria para encontrar uno
     return this.productsServices.findAll();
   }
 
   @Get(':id')
   finOne( @Param('id', ParseIntPipe)  id: number) {
     return this.productsServices.findOne(id);
   }
    //El param se utiliza para cuando estamos tocando los campos de la base de datos
 
   @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsServices.remove(id);
   }
 
   //El metodo Patch actualiza parcialmente, solamente lo necesario
   // Los pipes son transformadores, transforman la data
   @Patch(':id')
   update( 
     @Param('id', ParseIntPipe) id: number,
     @Body() createProductDto:CreateProductDto, 
     ) {
       return this.productsServices.update(id,createProductDto)
     }
   }
 