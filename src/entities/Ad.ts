import { Length } from "class-validator";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({length:100})
  title!: string;

  @Column()
  @Length(10,100,{
    message: "Entre 10 et 100 caractères"
  })
  description?: string;

  @Column()
  owner!: string;

  @Column()
  price!: number;

  @Column()
  picture!: string;

  @Column()
  location!: string;

  @Column()
  createdAt!: string;

  @ManyToOne(() => Category, category => category.ads) category!: Category; 
  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  tags!: Tag[];

}
