import { 
    Column, 
    Entity, 
    Tree,
    TreeChildren,
    TreeParent
  } from "typeorm";
  import { BaseEntity } from "../../../config/base.entity";
  
  @Entity({ name: 'menu_items' })
  export class MenuItem extends BaseEntity {
  
    @Column({ nullable: true })
    title!: string;
  
    @Column({ nullable: true })
    type_menu!: string;
  
    @Column({ nullable: true })
    key_menu!: string;

    @Column({ nullable: true })
    icon!: string;

    @Column({ nullable: true })
    order!: number;

    @Column({ nullable: true })
    parent_id!: number;

    @Column({ nullable: true })
    link!: string;

    children?: MenuItem[];
  

  }
  