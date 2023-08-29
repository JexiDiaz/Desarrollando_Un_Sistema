import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Product} from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product.dto';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  //Este es para crear un registro de productos
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    await this.productRepo.save(product);

    return product;
  }
    //Encontrar un registro de productos
    //findOne(id: number){
      //return this.productRepo.findOneBy({id});
    //}
    
     //Encontrar un producto
     //Encontrar un registro de las categorias
    findOne(id: number){
      return this.productRepo.findOne({
        where: {id},
        relations: {
          autor: true,
          categoria: true,
        }
    });
  }
    //Mostrar todos los registros de los productos
    findAll(){
      return this.productRepo.find({
       order: {id: 'ASC' }, 
      });
    }

    //Eliminar un registro de los productos

    async remove(id: number){
      const Product = await this.findOne(id);
      await this.productRepo.remove(Product);
      return 'Producto eliminado satisfactoriamente';
    }

    //Actualizar un producto o un registro de productos

    async update(id: number, cambios: CreateProductDto){
      // aqui se encuentra el 
      const oldProduct = await this.findOne(id);
      //Aqui lo actualizo o lo uno con los nuevos cambios
      const updatedProduct = await this.productRepo.merge(oldProduct, cambios);
      //Aqui retornare  el product
      return this.productRepo.save(updatedProduct);
    }
 
  }
