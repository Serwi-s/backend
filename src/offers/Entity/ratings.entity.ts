import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OffersEntity } from "./offers.entity";

@Entity("offer_review")
export class RatingsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => OffersEntity, (type) => type.id)
  @JoinColumn({ name: "prod_id" })
  prod_id: string;

  @Column({ type: "varchar", nullable: false })
  content: string;

  @Column({ type: "tinyint", nullable: false })
  rating: 1 | 2 | 3 | 4 | 5 | 6;

  @CreateDateColumn()
  @Column({ name: "created_at", insert: true })
  created_at: Date;
}
