import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateManagerDto } from "./create-manager.dto";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateManagerDto extends PartialType(CreateManagerDto) {
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
