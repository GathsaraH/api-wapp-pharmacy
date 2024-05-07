import { MedicationEntity } from "./../entites/medication.entity";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { MedicationService } from "./medication.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Medication Module")
@Controller("medication")
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post("create")
  @HttpCode(201)
  async createMedication(
    @Body() createMedicationDto: CreateMedicationDto
  ): Promise<void> {
    await this.medicationService.createMedication(createMedicationDto);
  }

  @Get("all")
  @HttpCode(200)
  async findAllMedication(): Promise<MedicationEntity[]> {
    return this.medicationService.findAllMedication();
  }

  @Patch("update/:medicationId")
  @HttpCode(200)
  async updateMedication(
    @Param("medicationId") medicationId: string,
    @Body() updateMedicationDto: UpdateMedicationDto
  ): Promise<void> {
    await this.medicationService.updateMedication(
      medicationId,
      updateMedicationDto
    );
  }

  @Delete("remove-soft/:medicationId")
  @HttpCode(200)
  async removeSoftMedication(
    @Param("medicationId") medicationId: string
  ): Promise<void> {
    await this.medicationService.removeSoftMedication(medicationId);
  }

  @Delete("remove/:medicationId")
  @HttpCode(200)
  async removeMedication(
    @Param("medicationId") medicationId: string
  ): Promise<void> {
    await this.medicationService.removeMedication(medicationId);
  }
}
