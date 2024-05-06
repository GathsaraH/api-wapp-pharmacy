import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { CustomerEntity } from "./customer.rntity";
import { RoleEnum } from "src/auth/guards/role.enum";

@Entity({ name: "roles" })
export class RoleEntity {
  @PrimaryGeneratedColumn("uuid", { name: "role_id" })
  roleId: string;
  @Column({ name: "name", type: "enum", enum: RoleEnum })
  name: RoleEnum;
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
  @OneToMany(() => UserEntity, (user) => user.roleId)
  users: UserEntity[];
  @OneToMany(() => UserEntity, (customer) => customer.roleId)
  customer: CustomerEntity[];
}
