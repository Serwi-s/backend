import { OffersEntity } from "src/offers/Entity/offers.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserDetailsEntity } from "./details.entity";

@Entity("users")
export class UsersEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: "60", nullable: false })
  email: string;

  @Column({ type: "varchar", length: "60", nullable: false })
  password: string;

  @CreateDateColumn()
  @Column({ name: "last_login", insert: true })
  last_login: Date;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @OneToOne(() => UserDetailsEntity, (type) => type.user_id)
  @JoinColumn({ name: "details" })
  details: UserDetailsEntity;

  @OneToMany(() => OffersEntity, (type) => type.id)
  @JoinColumn({ name: "offers" })
  offers: OffersEntity[];
}
