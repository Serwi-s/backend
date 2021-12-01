import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("images")
export class ImagesEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  path: string;

  @Column({ type: "varchar" })
  original_name: string;

  @Column({ type: "varchar" })
  offer_id: string;
}
