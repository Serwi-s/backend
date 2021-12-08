import { UsersEntity } from "src/users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

enum CartStatus {
  purchased = "PURCHASED",
  notpurchased = "NOTPURCHASED",
}

@Entity("cart")
export class CartEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => UsersEntity, (type) => type.id)
  @JoinColumn({ name: "user_id" })
  user_id: UsersEntity;

  @Column({ type: "enum", enum: CartStatus, default: CartStatus.notpurchased })
  status: CartStatus;
}
