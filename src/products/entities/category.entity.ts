import { Users } from 'src/users/entities/users.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,  } from 'typeorm';

@Entity()
  export class Category{
    @PrimaryGeneratedColumn({type: 'int4' }) 
    id?: number;

    @Column({ type: 'varchar', nullable: false })
    categoria: string;

    @CreateDateColumn({ type:'timestamp', default: () => 'CONCURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({ type:'int8', nullable: false})
    user_id: number;
    
    @ManyToOne(() => Users )
    @JoinColumn ({
    name:'user_id',
    referencedColumnName: 'id',
    })

    autor: Users;
  
}
