import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

enum DeliveryStatus {
  arrived = "arrived",
}

@Entity("orders")
export class PurchasesEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // user_id relation

  @CreateDateColumn()
  @Column({ name: "time", insert: true })
  time: Date;

  @Column({
    type: "enum",
    enum: DeliveryStatus,
    default: DeliveryStatus.arrived,
  })
  delivery: DeliveryStatus;

  @Column({ type: "uuid" })
  transaction: string;
}
