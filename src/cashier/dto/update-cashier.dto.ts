import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCashierDto } from "./create-cashier.dto";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateCashierDto extends PartialType(CreateCashierDto) {
  @ApiProperty({
    example: "me@email.com",
    required: false,
    description: "The email of the manager",
  })
  @IsEmail()
  @IsOptional()
  email: string;
  @ApiProperty({
    example: "gathsara",
    required: false,
    description: "The username of the manager",
  })
  @IsString()
  @IsOptional()
  userName: string;
  @ApiProperty({
    example: "Gathsara Umesh",
    required: false,
    description: "The name of the manager",
  })
  @IsString()
  @IsOptional()
  name: string;
}
