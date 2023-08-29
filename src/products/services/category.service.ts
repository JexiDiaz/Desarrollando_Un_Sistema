import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCategoryDto } from '../dto/category.dto';
import { Category } from "../entities/category.entity";


 @Injectable()
 export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  //Este es para crear un registro de categorias
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepo.create(createCategoryDto);
    await this.categoryRepo.save(category);

    return category;
  }

    //Encontrar un registro de las categorias
    findOne(id: number){
      return this.categoryRepo.findOneBy({id});
  }
    //Mostrar todos las categorias
    findAll(){
      return this.categoryRepo.find({
       order: {id: 'ASC' }, 
      });
    }

    //Eliminar un registro de las categorias
    async remove(id: number){
      const Category = await this.findOne(id);
      await this.categoryRepo.remove(Category);
      return 'Categoria eliminada satisfactoriamente';
    }
     //Actualizar una categoria
    async update(id: number, cambios: CreateCategoryDto){
      const oldCategory = await this.findOne(id);
      const updatedCategory= await this.categoryRepo.merge( oldCategory, cambios);
      return this.categoryRepo.save(updatedCategory);
    }
  }