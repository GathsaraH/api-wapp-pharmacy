import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { ManagerService } from "./manager.service";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import { ApiTags } from "@nestjs/swagger";
import { ManagerEntity } from "src/entites/manager.entity";
import { RoleEnum } from "src/auth/guards/role.enum";
import { Roles } from "src/auth/guards/roles.decorator";

@Controller("manager")
@ApiTags("Manager Module")
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post("create")
  @HttpCode(201)
  @Roles(RoleEnum.Admin)
  async createManager(
    @Body() createManagerDto: CreateManagerDto
  ): Promise<void> {
    await this.managerService.createManager(createManagerDto);
  }

  @Get("all")
  @Roles(RoleEnum.Admin)
  @HttpCode(200)
  async findAllManagers(): Promise<ManagerEntity[]> {
    return this.managerService.findAllManagers();
  }

  @Patch("update/:managerId")
  @HttpCode(200)
  @Roles(RoleEnum.Admin)
  async updateManager(
    @Param("managerId") managerId: string,
    @Body() updateManagerDto: UpdateManagerDto
  ): Promise<void> {
    await this.managerService.updateManager(managerId, updateManagerDto);
  }

  @Delete("remove-soft/:managerId")
  @HttpCode(200)
  @Roles(RoleEnum.Admin)
  async removeSoftManager(
    @Param("managerId") managerId: string
  ): Promise<void> {
    await this.managerService.removeSoftManager(managerId);
  }

  @Delete("remove/:managerId")
  @HttpCode(200)
  async removeManager(@Param("managerId") managerId: string): Promise<void> {
    await this.managerService.removeManager(managerId);
  }
}
