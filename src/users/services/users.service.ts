import { Injectable } from '@nestjs/common';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDto } from '../dto/users.dto';





@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
  ) {}

  //Este es para crear un registro  
  async create( createUsersDto: CreateUsersDto ){
    const users = this. usersRepo.create(createUsersDto);
    await this.usersRepo.save(users);

    return Users;
  }

    //Encontrar un registro de users
    findOne(id: number){
      return this.usersRepo.findOneBy({id});
    }

    //Mostrar todos los registros de users
    findAll(){
      return this.usersRepo.find({
       order: {id: 'ASC' }, 
      });
    }

    //Eliminar un registro de users
    async remove(id: number){
      const Users = await this.findOne(id);
      await this.usersRepo.remove(Users);
      return 'usuario eliminado satisfactoriamente';
    }

    //Actualizar un producto o un registro de users
    async update(id: number, cambios : CreateUsersDto){
      // aqui se encuentra el users
      const oldUsers = await this.findOne(id);
      //Aqui lo actualizo o lo uno con los nuevos cambios del users
      const updatedUsers = await this.usersRepo.merge(oldUsers, cambios );
      //Aqui retornare  el product
      return this.usersRepo.save(updatedUsers);
    }
 
  }