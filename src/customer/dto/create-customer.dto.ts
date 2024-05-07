import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class CreateCustomerDto {
  @ApiProperty({
    example: "Nuwan Sandeep",
    description: "Customer name",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: "+94771234567",
    description:
      "Customer phone number (Should be staned number fomat with cuntry code)",
    required: true,
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
  @ApiProperty({
    example: 25,
    description: "Customer age",
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;
  @ApiProperty({
    example: 35,
    description: "Customer weight",
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  height: number;
}
