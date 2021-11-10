import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UsersEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: "60", nullable: false })
  email: string;

  @Column({ type: "varchar", length: "60", nullable: false })
  password: string;
}
