import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicationEntity } from "src/entites/medication.entity";
import { Repository } from "typeorm";

@Injectable()
export class MedicationService {
  private logger: Logger = new Logger(MedicationService.name);
  constructor(
    @InjectRepository(MedicationEntity)
    private readonly medicationRepository: Repository<MedicationEntity>
  ) {}
  async createMedication(dto: CreateMedicationDto) {
    try {
      this.logger.debug(
        `Creating medication with data: ${JSON.stringify(dto)}`
      );
      const medication = this.medicationRepository.create({
        name: dto.name,
        description: dto.description,
        quantity: dto.quantity,
      });
      await this.medicationRepository.save(medication);
    } catch (error) {
      this.logger.error(`Error creating medication: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAllMedication(): Promise<MedicationEntity[]> {
    try {
      this.logger.debug(`Fetching all medications`);
      const medication = await this.medicationRepository.find();
      if (!medication.length) {
        throw new HttpException("No medication found", HttpStatus.NOT_FOUND);
      }
      return medication;
    } catch (error) {
      this.logger.error(
        `Error fetching all medications: ${JSON.stringify(error)}`
      );
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateMedication(
    medicationId: string,
    updateMedicationDto: UpdateMedicationDto
  ): Promise<void> {
    try {
      this.logger.debug(
        `Updating medication with id: ${medicationId} with data: ${JSON.stringify(
          updateMedicationDto
        )}`
      );

      const updateResult = await this.medicationRepository.update(
        { medicationId },
        { ...updateMedicationDto }
      );

      if (updateResult.affected === 0) {
        throw new HttpException("No medication found", HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      this.logger.error(`Error updating medication: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeSoftMedication(medicationId: string): Promise<void> {
    try {
      this.logger.debug(`Removing medication with id (soft): ${medicationId}`);
      const medication = await this.medicationRepository.findOne({
        where: { medicationId },
      });
      if (!medication) {
        throw new HttpException("No medication found", HttpStatus.NOT_FOUND);
      }
      await this.medicationRepository.update(
        { medicationId },
        { isArchived: true }
      );
    } catch (error) {
      this.logger.error(
        `Error removing medication (soft): ${JSON.stringify(error)}`
      );
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async removeMedication(medicationId: string): Promise<void> {
    try {
      this.logger.debug(`Removing medication with id: ${medicationId}`);
      const deleteResult = await this.medicationRepository.delete({
        medicationId,
      });
      if (deleteResult.affected === 0) {
        throw new HttpException("No medication found", HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      this.logger.error(`Error removing medication: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
