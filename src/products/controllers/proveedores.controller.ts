import { Controller,
    Post,
     Body, 
     Get, 
     Param,
     ParseIntPipe,
     Delete, 
     Patch,
     } from '@nestjs/common';
import { ProveedoresService } from '../services/proveedores.service';
import { CreateProveedorDto } from '../dto/proveedor.dto';

  @Controller('proveedores')
  
    export class ProveedoresController {
      constructor(private readonly proveedoresService: ProveedoresService) {}
  
      @Post()
       async create(@Body() provedoresDto: CreateProveedorDto) {
     return await this.proveedoresService.create(provedoresDto);
     }
  
     @Get() //Este seria para encontrar todos los proveedores
     findAll() { 
     return this.proveedoresService.findAll();
     }
   
      @Get(':id')
      finOne( @Param('id', ParseIntPipe)  id: number) {
      return this.proveedoresService.findOne(id);
      }
  
      @Delete(':id')
      remove(@Param('id', ParseIntPipe) id: number) {
      return this.proveedoresService.remove(id);
     }
  
     @Patch(':id')
      update( 
         @Param('id', ParseIntPipe) id: number,
         @Body() createProveedorDto:CreateProveedorDto, 
         ) {
         return this.proveedoresService.update(id,createProveedorDto)
         }
        }