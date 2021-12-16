import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OffersEntity } from "./offers.entity";

@Entity("images")
export class ImagesEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  path: string;

  @Column({ type: "varchar" })
  original_name: string;

  @ManyToOne(() => OffersEntity, (type) => type.id)
  @JoinColumn({ name: "offer_id" })
  offer_id: string;
}
