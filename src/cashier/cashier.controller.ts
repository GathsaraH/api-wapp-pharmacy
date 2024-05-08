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
import { CashierService } from "./cashier.service";
import { CreateCashierDto } from "./dto/create-cashier.dto";
import { UpdateCashierDto } from "./dto/update-cashier.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CashierEntity } from "src/entites/cashier.entity";
import { Roles } from "src/auth/guards/roles.decorator";
import { RoleEnum } from "src/auth/guards/role.enum";

@ApiTags("Cashier Module")
@Controller("cashier")
export class CashierController {
  constructor(private readonly cashierService: CashierService) {}

  @Post("create")
  @HttpCode(201)
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth("JWT-auth")
  async createCashier(
    @Body() createCashierDto: CreateCashierDto
  ): Promise<void> {
    await this.cashierService.createCashier(createCashierDto);
  }

  @Get("all")
  @Roles(RoleEnum.Admin)
  @HttpCode(200)
  @ApiBearerAuth("JWT-auth")
  async findAllCashier(): Promise<CashierEntity[]> {
    return this.cashierService.findAllCashier();
  }
  @Patch("update/:cashierId")
  @HttpCode(200)
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth("JWT-auth")
  async updateCashier(
    @Param("cashierId") cashierId: string,
    @Body() updateCashierDto: UpdateCashierDto
  ): Promise<void> {
    await this.cashierService.updateCashier(cashierId, updateCashierDto);
  }

  @Delete("remove/:cashierId")
  @HttpCode(200)
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth("JWT-auth")
  async removeCashier(@Param("cashierId") cashierId: string): Promise<void> {
    await this.cashierService.removeCashier(cashierId);
  }
}
