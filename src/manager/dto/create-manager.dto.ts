import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateManagerDto {
  @ApiProperty({
    example: "me@email.com",
    required: true,
    description: "The email of the manager",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    example: "gathsara",
    required: true,
    description: "The username of the manager",
  })
  @IsString()
  @IsNotEmpty()
  userName: string;
  @ApiProperty({
    example: "Gathsara Umesh",
    required: true,
    description: "The name of the manager",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
