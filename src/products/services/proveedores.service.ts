import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProveedorDto } from "../dto/proveedor.dto";
import { Proveedor } from "../entities/proveedor.entity";


 @Injectable()
 export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepo: Repository<Proveedor>,
  ) {}

  //Este es para crear un registro de proveedor
  async create(createProveedoresDto: CreateProveedorDto) {
    const proveedor = this.proveedorRepo.create(createProveedoresDto);
    await this.proveedorRepo.save(proveedor);

    return proveedor;
  }

    //Encontrar un registro de los proveedores
    findOne(id: number){
      return this.proveedorRepo.findOneBy({id});
  }
    //Mostrar todos las proveedores
    findAll(){
      return this.proveedorRepo.find({
       order: {id: 'ASC' }, 
      });
    }

    //Eliminar un registro de los proveedores
    async remove(id: number){
      const Proveedor = await this.findOne(id);
      await this.proveedorRepo.remove(Proveedor);
      return 'Proveedor eliminado satisfactoriamente';
    }
     //Actualizar un proveedor
    async update(id: number, cambios: CreateProveedorDto){
      const oldProveedor = await this.findOne(id);
      const updatedProveedor= await this.proveedorRepo.merge( oldProveedor, cambios);
      return this.proveedorRepo.save(updatedProveedor);
    }
  }