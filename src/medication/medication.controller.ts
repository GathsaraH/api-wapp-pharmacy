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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RoleEnum } from "src/auth/guards/role.enum";
import { Roles } from "src/auth/guards/roles.decorator";

@ApiTags("Medication Module")
@Controller("medication")
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post("create")
  @HttpCode(201)
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth("JWT-auth")
  async createMedication(
    @Body() createMedicationDto: CreateMedicationDto
  ): Promise<void> {
    await this.medicationService.createMedication(createMedicationDto);
  }

  @Get("all")
  @HttpCode(200)
  @Roles(RoleEnum.Admin,RoleEnum.Manager,RoleEnum.Cashier)
  async findAllMedication(): Promise<MedicationEntity[]> {
    return this.medicationService.findAllMedication();
  }

  @Patch("update/:medicationId")
  @HttpCode(200)
  @Roles(RoleEnum.Admin,RoleEnum.Manager,RoleEnum.Cashier)
  @ApiBearerAuth("JWT-auth")
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
  @Roles(RoleEnum.Admin,RoleEnum.Manager)
  @ApiBearerAuth("JWT-auth")
  async removeSoftMedication(
    @Param("medicationId") medicationId: string
  ): Promise<void> {
    await this.medicationService.removeSoftMedication(medicationId);
  }

  @Delete("remove/:medicationId")
  @HttpCode(200)
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth("JWT-auth")
  async removeMedication(
    @Param("medicationId") medicationId: string
  ): Promise<void> {
    await this.medicationService.removeMedication(medicationId);
  }
}
