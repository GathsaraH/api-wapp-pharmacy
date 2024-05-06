import { IsNotEmpty } from "class-validator";
import { RoleEntity } from "src/entites/role.entity";

export class CreateUserDto {
  @IsNotEmpty()
  roleId: RoleEntity;
  @IsNotEmpty()
  userName: string;
}
