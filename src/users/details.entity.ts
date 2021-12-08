import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity("user_details")
export class UserDetailsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", nullable: false })
  user_id: UsersEntity;

  @Column({ type: "varchar", nullable: false, length: "50" })
  name: string;

  @Column({ type: "varchar", nullable: false, length: "50" })
  surname: string;

  @Column({ type: "char" })
  phone_number: string;

  @Column({ type: "varchar", nullable: false, length: "50" })
  city: string;

  @Column({ type: "varchar", length: "50" })
  street: string;

  @Column({ type: "varchar", length: "50" })
  home_number: string;

  @Column({ type: "char", length: "5" })
  postal_code: string;
}
