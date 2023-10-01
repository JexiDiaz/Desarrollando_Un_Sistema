import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Users } from "../entities/users.entity";
import { DataSource, Repository } from "typeorm";
import { UsersImage } from "../entities/users.image.entity";
import { CreateUsersDto } from "../dto/users.dto";



@Injectable()
export class UsersService{
    constructor(
     @InjectRepository(Users)
      private  readonly usersRepo: Repository<Users>,

         @InjectRepository(UsersImage)
        private usersImageRepo: Repository<UsersImage>,

        private readonly dataSource: DataSource,
    ){}

    async create (UsersDto: CreateUsersDto){
        const {images = [], ...detailUsers} = UsersDto;
        const users = await this.usersRepo.create({
            ...detailUsers,
            images:images.map((image) => this.usersImageRepo.create({url:image}))
        })

        await this.usersRepo.save(users);
        return users;
    }


    //Encontrar un user
    findOne(id: number){
        return this.usersRepo.findOne({  
            where:{id},
            relations:{
            images:true
        }});
    }
    //mostrar todos los usuarios
    findAll(){
        return   this.usersRepo.find({
            order: {id: 'ASC'},
            relations:{
            images:true}
        });
    }
    //eliminar un usuario
    async remove(id:number){
        const users =await this.findOne(id);
        await this.usersRepo.remove(users);
        return ' Este suario  esta eliminado';
    }

  
    async update(id: number, usersDto: CreateUsersDto){
        const {images, ...updateAll} = usersDto
        const users = await this.usersRepo.preload({
            id:id,
            ... updateAll
        });

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        if(images){
            await queryRunner.manager.delete(UsersImage, {users: {id}});

            users.images = images.map((image)=>
                this.usersImageRepo.create({url: image}),
            )

        }else{
            users.images =await this.usersImageRepo.findBy({ users: {id}});
        }

        await queryRunner.manager.save(users);

        await queryRunner.commitTransaction();
        await queryRunner.release();

        return users;
    }
}