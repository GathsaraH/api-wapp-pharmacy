import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { RoleEntity } from "./role.entity";

@Entity({ name: "customers" })
export class CustomerEntity {
  @PrimaryGeneratedColumn("uuid", { name: "customer_id" })
  customerId: string;
  @Column({ name: "name" })
  name: string;
  @Column({ name: "email" })
  phoneNumber: string;
  @Column({ name: "age" })
  age: number;
  @Column({ name: "weight" })
  height: number;
  @Column({ name: "is_archived", default: false })
  isArchived: boolean;
  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updateAt: Date;
  @JoinColumn({ name: "role_id" })
  @ManyToOne(() => RoleEntity, (role) => role.customer)
  roleId: RoleEntity;
}
