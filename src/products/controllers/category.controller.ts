import { Controller,
    Post,
     Body, 
     Get, 
     Param,
     ParseIntPipe,
     Delete, 
     Patch,
     } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/category.dto';

  @Controller('Category')
  
    export class CategoryController {
      constructor(private readonly categoryServices: CategoryService) {}
  
      @Post()
       async create(@Body() categoryDto: CreateCategoryDto ) {
     return await this.categoryServices.create(categoryDto);
     }
  
     @Get() //Este seria para encontrar todas las categorias
     findAll() { 
     return this.categoryServices.findAll();
     }
   
      @Get(':id')
      finOne( @Param('id', ParseIntPipe)  id: number) {
      return this.categoryServices.findOne(id);
      }
  
      @Delete(':id')
      remove(@Param('id', ParseIntPipe) id: number) {
      return this.categoryServices.remove(id);
     }
  
     @Patch(':id')
     update( 
       @Param('id', ParseIntPipe) id: number,
       @Body() createCategoryDto:CreateCategoryDto, 
        ) {
         return this.categoryServices.update(id,createCategoryDto)
        }
     }