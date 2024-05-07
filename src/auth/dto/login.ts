import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    required: true,
    description: "The user name of the user",
    example: "gathsara",
  })
  @IsString()
  @IsNotEmpty()
  userName: string;
  @ApiProperty({
    required: true,
    description: "The password of the user",
    example: "Gathsara@123#",
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
