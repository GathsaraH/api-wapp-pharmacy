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
import { ApiTags } from "@nestjs/swagger";
import { CustomerEntity } from "src/entites/customer.rntity";

@ApiTags("Customer Module")
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post("create")
  @HttpCode(201)
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto
  ): Promise<void> {
    await this.customerService.createCustomer(createCustomerDto);
  }

  @Get("all")
  @HttpCode(200)
  async findAllCustomers(): Promise<CustomerEntity[]> {
    return this.customerService.findAllCustomers();
  }

  @Patch("update/:customerId")
  @HttpCode(200)
  async updateCustomer(
    @Param("customerId") customerId: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<void> {
    await this.customerService.updateCustomer(customerId, updateCustomerDto);
  }

  @Delete("remove-soft/:customerId")
  @HttpCode(200)
  async removeSoftCustomer(
    @Param("customerId") customerId: string
  ): Promise<void> {
    await this.customerService.removeSoftCustomer(customerId);
  }
  @Delete("remove/:customerId")
  @HttpCode(200)
  async removeCustomer(@Param("customerId") customerId: string): Promise<void> {
    await this.customerService.removeCustomer(customerId);
  }
}
