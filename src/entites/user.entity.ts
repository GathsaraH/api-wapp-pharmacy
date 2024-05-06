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

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid", { name: "user_id" })
  userId: string;
  @Column({ name: "user_name" })
  userName: string;
  @Column({ name: "email" })
  email: string;
  @Column({ name: "password" })
  password: string;
  @Column({ name: "is_archived" ,default: false})
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
  @ManyToOne(() => RoleEntity, (role) => role.users)
  roleId: RoleEntity;
}
