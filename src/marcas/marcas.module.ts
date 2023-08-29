import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Marca } from './entities/marca.entity';
import { MarcasController } from './controllers/marcas.controller';
import { MarcasService } from './services/marcas.service';
import { Modelo } from './entities/modelo.entity'
import { ModeloService } from './services/modelo.service';
import { ModeloController } from './controllers/modelo.controllers';




@Module ({
  imports: [TypeOrmModule.forFeature([Marca, Modelo])],
  controllers: [ModeloController, MarcasController],
  providers: [ ModeloService, MarcasService],

})
  

export class  MarcasModule {} 