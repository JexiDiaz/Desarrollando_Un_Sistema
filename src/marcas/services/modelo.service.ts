import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateModeloDto } from '../dto/modelo.dto';
import { Repository } from 'typeorm';
import { Modelo } from '../entities/modelo.entity';



 @Injectable()
 export class ModeloService {
  constructor(
    @InjectRepository(Modelo)
    private readonly modeloRepo: Repository<Modelo>,
  ) {}

  //Este es para crear un registro de marcas
  async create(createModeloDto: CreateModeloDto) {
    const modelo = this.modeloRepo.create(createModeloDto);
    await this.modeloRepo.save(modelo);

    return modelo;
  }
    //Encontrar un registro de  modelo
    findOne(id: number){
      return this.modeloRepo.findOne({
        where: {id},
        relations: {
          autor: true,
        }
    });
  }
    //Mostrar todos los modelos
    findAll(){
      return this.modeloRepo.find({
       order: {id: 'ASC' }, 
      });
    }

    //Eliminar un registro de los modelo
    async remove(id: number){
      const Modelo = await this.findOne(id);
      await this.modeloRepo.remove(Modelo);
      return 'Modelo eliminada satisfactoriamente';
    }
     //Actualizar un modelo
    async update(id: number, cambios: CreateModeloDto){
      const oldModelo = await this.findOne(id);
      const updatedModelo= await this.modeloRepo.merge(oldModelo, cambios);
      return this.modeloRepo.save(updatedModelo);
    }
  }