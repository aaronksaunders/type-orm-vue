import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "first_name", type: "varchar" })
  firstName: string | undefined;

  @Column({ name: "last_name", type: "varchar" })
  lastName!: string;

  @Column({ name: "age", type: "int" })
  age!: number;
}
