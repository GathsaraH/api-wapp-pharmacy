import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMedicationDto {
  @ApiProperty({
    description: "Name of the medication",
    type: String,
    required: true,
    default: "Paracetamol",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: "Description of the medication",
    type: String,
    required: true,
    default: "This is a medication for headache",
  })
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty({
    description: "Price of the medication",
    type: Number,
    required: true,
    default: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
