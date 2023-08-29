import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,  } from 'typeorm';

@Entity()
  export class Proveedor{
    @PrimaryGeneratedColumn({type: 'int4' }) 
    id?: number;

    @Column({ type: 'varchar', nullable: false })
    proveedor: string;

    @Column({ type:'int8', nullable: false})
    user_id: number;

    @CreateDateColumn({ type:'timestamp', default: () => 'CONCURRENT_TIMESTAMP'})
    created_at: Date;

}