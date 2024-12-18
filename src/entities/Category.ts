import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./Ad";
import { Field } from "type-graphql";

@Entity()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @OneToMany(()=> Ad, ad => ad.category) 
  ads!:Ad[];
}
