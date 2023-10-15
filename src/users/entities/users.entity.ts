import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {  UsersImage } from './users.image.entity';



@Entity()
export class Users {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar',  nullable: false })
  name: string;

  @Column({ type: 'varchar',  nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  sexo: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'text', array: true, default: [ 'users'] })
  roles: string;

  @OneToMany(() => UsersImage, (usersImage) => usersImage.users, {
    cascade : true
  })
  images?:UsersImage[];
}