import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp without time zone",
  })
  created_at!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp without time zone",
  })
  updated_at!: Date;
}