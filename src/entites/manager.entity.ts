import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "manager" })
export class ManagerEntity{
    @PrimaryGeneratedColumn("uuid", { name: "manager_id" })
    managerId: string;
    @Column({ name: "name" })
    name:string;
    @Column({ name: "email" })
    email: string;
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
    @JoinColumn({ name: "user_id" })
    @ManyToOne(() => UserEntity, (user) => user.manager)
    userId: UserEntity;
}