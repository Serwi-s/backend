import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class UsersEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: "60", nullable: false })
  email: string;

  @Column({ type: "varchar", length: "60", nullable: false })
  password: string;

  @CreateDateColumn()
  @Column({ name: "joined_at", insert: true })
  joined_at: Date;

  @Column({ type: "varchar", length: "50", nullable: false })
  name: string;

  @Column({ type: "varchar", length: "50", nullable: false })
  surname: string;

  @Column({ type: "varchar", length: "50" })
  phone_number: string;

  @Column({ type: "varchar", length: "50" })
  city: string;

  @Column({ type: "varchar", length: "50" })
  street: string;

  @Column({ type: "varchar", length: "50" })
  home_nr: string;

  @Column({ type: "varchar", length: "50" })
  postal_code: string;
}
