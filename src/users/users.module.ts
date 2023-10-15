import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UsersImage } from './entities/users.image.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Users,UsersImage])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [TypeOrmModule, UsersModule]
   
})
export class UsersModule{}