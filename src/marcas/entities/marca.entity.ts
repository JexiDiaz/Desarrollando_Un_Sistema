import { Column, Entity, PrimaryGeneratedColumn,  } from 'typeorm';


@Entity()
export class  Marca{
   @PrimaryGeneratedColumn({type: 'int4' }) //este decorador hace referencia al primari key
    id?: number;

    @Column({ type: 'varchar', length: 60, nullable: false })
     marca: string;

    @Column({ type:'int8', nullable: false})
      user_id: number;

  
}
