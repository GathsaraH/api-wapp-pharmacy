import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "medications" })
export class MedicationEntity {
  @PrimaryGeneratedColumn("uuid", { name: "medication_id" })
  medicationId: string;
  @Column({ name: "name" })
  name: string;
  @Column({ name: "description" })
  description: string;
  @Column({ name: "price" })
  quantity: number;
  @Column({ name: "is_archived", default: false })
  isArchived: boolean;
  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;
  @CreateDateColumn({
    type: "timestamp",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updateAt: Date;
}
