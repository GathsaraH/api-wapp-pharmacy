import { Module } from "@nestjs/common";
import { MedicationService } from "./medication.service";
import { MedicationController } from "./medication.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MedicationEntity } from "src/entites/medication.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MedicationEntity])],
  controllers: [MedicationController],
  providers: [MedicationService],
})
export class MedicationModule {}
