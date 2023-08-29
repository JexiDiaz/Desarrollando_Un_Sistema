import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMarcasDto } from '../dto/marca.dto';
import { Marca } from '../entities/marca.entity';



@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepo: Repository<Marca>,
  ) {}

  //Este es para crear un registro de marcas
  async create(createMarcasDto: CreateMarcasDto) {
    const marcas = this.marcaRepo.create(createMarcasDto);
    await this.marcaRepo.save(marcas);

    return marcas;
  }

    //Encontrar una marca
    findOne(id: number){
      return this.marcaRepo.findOneBy({id});
    }
  
    //Mostrar todas las marcas 
    findAll(){
      return this.marcaRepo.find({
       order: {id: 'ASC' }, 
      });
    }

    //Eliminar un registro de las marcas
    async remove(id: number){
      const Marcas = await this.findOne(id);
      await this.marcaRepo.remove(Marcas);
      return 'Marca eliminada satisfactoriamente';
    }

    //Actualizar una marca 
    async update(id: number, cambios: CreateMarcasDto){
      // aqui se encuentra la marca
      const oldMarca = await this.findOne(id);
      //Aqui lo actualizo o lo uno con los nuevos cambios
      const updatedMarca = await this.marcaRepo.merge(oldMarca, cambios);
      //Aqui retornare  a la marca
      return this.marcaRepo.save(updatedMarca);
    }
  }
