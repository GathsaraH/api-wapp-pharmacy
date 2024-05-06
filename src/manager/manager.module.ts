import { Module } from "@nestjs/common";
import { ManagerService } from "./manager.service";
import { ManagerController } from "./manager.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "src/entites/role.entity";
import { UserEntity } from "src/entites/user.entity";
import { ManagerEntity } from "src/entites/manager.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity, ManagerEntity])],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
