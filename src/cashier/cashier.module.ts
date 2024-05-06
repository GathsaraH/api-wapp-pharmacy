import { Module } from "@nestjs/common";
import { CashierService } from "./cashier.service";
import { CashierController } from "./cashier.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CashierEntity } from "src/entites/cashier.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CashierEntity])],
  controllers: [CashierController],
  providers: [CashierService],
})
export class CashierModule {}
