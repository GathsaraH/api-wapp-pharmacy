import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerEntity } from "src/entites/customer.rntity";
import { RoleEntity } from "src/entites/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, RoleEntity])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
