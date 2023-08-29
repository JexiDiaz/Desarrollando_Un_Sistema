import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Product} from './entities/product.entity';
import { ProductsService } from './services/product.service';
import { ProductsController } from './controllers/products.controller';
import { ProductImage } from './entities/product.image.entity';
import { Category } from './entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { ProveedoresController } from './controllers/proveedores.controller';
import { ProveedoresService } from './services/proveedores.service';
import { Proveedor } from './entities/proveedor.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductImage, Category, Proveedor])], 
    controllers: [ProductsController, CategoryController, ProveedoresController],
    //Aqui van los controladorres
    providers: [ProductsService, CategoryService, ProveedoresService],
    // aqui van los servicios
   
})


export class ProductsModule{}