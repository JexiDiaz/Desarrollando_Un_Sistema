import { Controller,
  Post,
   Body, 
   Get, 
   Param,
   ParseIntPipe,
   Delete, 
   Patch,
   } from '@nestjs/common';
import { MarcasService } from '../services/marcas.service';
import { CreateMarcasDto} from '../dto/marca.dto';

    @Controller('Marcas')

   export class MarcasController {
 constructor(private readonly MarcaService: MarcasService) {}

 @Post()
 async create(@Body() MarcaDto: CreateMarcasDto) {
   return await this.MarcaService.create(MarcaDto);
 }

 @Get() //Este seria para encontrar todas las marcas 
 findAll() { 
   return this.MarcaService.findAll();
 }

 @Get(':id')
 finOne( @Param('id', ParseIntPipe)  id: number) {
   return this.MarcaService.findOne(id);
 }
  
 @Delete(':id')
 remove(@Param('id', ParseIntPipe) id: number) {
  return this.MarcaService.remove(id);
 }

 @Patch(':id')
 update( 
   @Param('id', ParseIntPipe) id: number,
   @Body() createMarcaDto:CreateMarcasDto, 
   ) {
     return this.MarcaService.update(id,createMarcaDto)
   }
 }