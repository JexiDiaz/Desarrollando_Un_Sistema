import { Column,
    CreateDateColumn,
    Entity, 
    JoinColumn, 
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
 } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Category } from './category.entity';
import { Proveedor } from './proveedor.entity';
import { ProductImage } from './product.image.entity';




@Entity()
export class Product {
    @PrimaryGeneratedColumn({type: 'int4' }) //este decorador hace referencia al primari key
    id?: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 300, nullable: false })
    description: string;

    @Column({ type: 'int4', nullable: false})
    price: number;

    @Column({ type: 'int4', nullable: false})
    stock: number;  
    
    @Column({type: 'int4', nullable: false})
    user_id: number;
    
    @Column({type: 'varchar', nullable: true })
    filename: string;

    //Esta columna me servira para almacenar la hora y la fecha en la que se crea est registro  
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({type: 'int4', nullable: false})
    categoria_id: number;

    @Column({type: 'int4', nullable: false})
    proveedor_id: number;


    //Relaciones  Users

    @ManyToOne(() => Users)
    @JoinColumn({
    name: 'user_id',//es el camponde referencia a mi tabla user_id
    referencedColumnName: 'id', //Este es el id del usuario  
    })
   autor: Users;


  //Relaciones de categoria
  @ManyToOne(() => Category)
  @JoinColumn({
  name: 'categoria_id', //es el campo en relacion a mi tabla  categoria_id
  referencedColumnName: 'id', //Este es el id del usuario 
  })
  categoria: Category;



  //Relaciones de proveedor
  @ManyToOne(() => Proveedor)
  @JoinColumn({
  name: 'proveedor_id', //es el campo en relacion a mi tabla  categoria_id
  referencedColumnName: 'id', //Este es el id del usuario 
  })
  proveedor: Proveedor;

  // Un producto puede tener muchas imagenes
 //Definicion de la relacion OneToMany
 
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
  })
  images?: ProductImage[];
}

   
