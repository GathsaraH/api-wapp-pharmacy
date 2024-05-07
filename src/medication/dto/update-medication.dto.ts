import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMedicationDto } from './create-medication.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMedicationDto extends PartialType(CreateMedicationDto) {
    @ApiProperty({
        description: "Name of the medication",
        type: String,
        required: false,
        default: "Paracetamol",
      })
      @IsString()
      @IsOptional()
      name: string;
      @ApiProperty({
        description: "Description of the medication",
        type: String,
        required: false,
        default: "This is a medication for headache",
      })
      @IsString()
      @IsOptional()
      description: string;
      @ApiProperty({
        description: "Price of the medication",
        type: Number,
        required: false,
        default: 100,
      })
      @IsNumber()
      @IsOptional()
      quantity: number;
}
