import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Product} from '../entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product.dto';
import { ProductImage } from '../entities/product.image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,

    private readonly dataSource: DataSource,
) {}

  //Este es para crear un registro de productos
  //async create(createProductDto: CreateProductDto) {
    //const product = this.productRepo.create(createProductDto);
    //await this.productRepo.save(product);

    //return product;
  //}

  //CREAR UN PRODUCTO Y AGREGAR LAS IAMGENES
  async create(productDto: CreateProductDto) {
    const { images = [], ...detailsProducts} = productDto;


    const product = await this.productRepo.create({
      ...detailsProducts,
      images: images.map((image) => 
       this.productImageRepo.create({ url: image }),

      ),
    });

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
       relations: {
       images: true,
       },
      });
    }

    //Eliminar un registro de los productos

    async remove(id: number){
      const Product = await this.findOne(id);
      await this.productRepo.remove(Product);
      return 'Producto eliminado satisfactoriamente';
    }

    //Actualizar un producto o un registro de productos

    //async update(id: number, cambios: CreateProductDto){
      // aqui se encuentra el 
      //const oldProduct = await this.findOne(id);
      //Aqui lo actualizo o lo uno con los nuevos cambios
      //const updatedProduct = await this.productRepo.merge(oldProduct, cambios);
      //Aqui retornare  el product
      //return this.productRepo.save(updatedProduct);
    //}
 
      //Actualizar un producto con imagenes
      async update(id: number, cambios: CreateProductDto) {
        const { images, ...updateAll } = cambios;
        const product = await  this.productRepo.preload({
          id: id,
          ...updateAll,
         });

         //Empezamos a correr nuestro queryRunner, esto seria el punto de partida de nuestra trnassaccion 
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        if (images) {
          //Si images no esta vacio, vamos a borrar las imagenes existentes
          await queryRunner.manager.delete(ProductImage, { product: { id }});

        
          //Aqui creamos nuevas iamgenes del producto
          product.images = images.map((image) =>
           this.productImageRepo.create({url: image }),
          );
        } else {
          product.images = await this.productImageRepo.findBy({product: { id } });
        }

        //Guardamos el producto
        await queryRunner.manager.save(product);

        //Finalizamos la transaccion y liberamos el queryRunner
        await queryRunner.commitTransaction();
        await queryRunner.release();

        return product;
      }
}
