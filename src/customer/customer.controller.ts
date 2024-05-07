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
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomerEntity } from "src/entites/customer.rntity";
import { Roles } from "src/auth/guards/roles.decorator";
import { RoleEnum } from "src/auth/guards/role.enum";

@ApiTags("Customer Module")
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post("create")
  @HttpCode(201)
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth("JWT-auth")
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto
  ): Promise<void> {
    await this.customerService.createCustomer(createCustomerDto);
  }

  @Get("all")
  @ApiBearerAuth("JWT-auth")
  async findAllCustomers(): Promise<CustomerEntity[]> {
    return this.customerService.findAllCustomers();
  }

  @Patch("update/:customerId")
  @HttpCode(200)
  @Roles(RoleEnum.Admin, RoleEnum.Manager, RoleEnum.Cashier)
  @ApiBearerAuth("JWT-auth")
  async updateCustomer(
    @Param("customerId") customerId: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<void> {
    await this.customerService.updateCustomer(customerId, updateCustomerDto);
  }

  @Delete("remove-soft/:customerId")
  @HttpCode(200)
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
  @ApiBearerAuth("JWT-auth")
  async removeSoftCustomer(
    @Param("customerId") customerId: string
  ): Promise<void> {
    await this.customerService.removeSoftCustomer(customerId);
  }
  @Delete("remove/:customerId")
  @HttpCode(200)
  @Roles(RoleEnum.Admin)
  @ApiBearerAuth("JWT-auth")
  async removeCustomer(@Param("customerId") customerId: string): Promise<void> {
    await this.customerService.removeCustomer(customerId);
  }
}
