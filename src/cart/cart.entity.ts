import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cart")
export class CartEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
