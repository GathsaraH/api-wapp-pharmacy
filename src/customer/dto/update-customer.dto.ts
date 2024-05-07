import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCustomerDto } from "./create-customer.dto";
import {
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiProperty({
    example: "Nuwan Sandeep",
    description: "Customer name",
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty({
    example: "+94771234567",
    description:
      "Customer phone number (Should be staned number fomat with cuntry code)",
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string;
  @ApiProperty({
    example: 25,
    description: "Customer age",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  age: number;
  @ApiProperty({
    example: 35,
    description: "Customer weight",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  height: number;
}
