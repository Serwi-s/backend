import { UsersEntity } from "src/users/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ImagesEntity } from "./images.entity";

@Entity("offers")
export class OffersEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => UsersEntity, (type) => type.id)
  @JoinColumn({ name: "user_id" })
  user_id: UsersEntity;

  @CreateDateColumn()
  @Column({ insert: true })
  exp_date: Date;

  @Column({ type: "varchar", length: 80, nullable: false })
  title: string;

  @Column({ type: "varchar", nullable: false })
  desc: string;

  @Column({ type: "double", nullable: false })
  price: number;

  @Column({ type: "tinyint" })
  rating: number; // 1-5

  @OneToMany(() => ImagesEntity, (type) => type.offer_id)
  @JoinColumn({ name: "images" })
  images: ImagesEntity[];
}
