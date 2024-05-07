import { Module } from "@nestjs/common";
import { CashierService } from "./cashier.service";
import { CashierController } from "./cashier.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CashierEntity } from "src/entites/cashier.entity";
import { EmailModule } from "src/email/email.module";

@Module({
  imports: [TypeOrmModule.forFeature([CashierEntity]),EmailModule],
  controllers: [CashierController],
  providers: [CashierService],
})
export class CashierModule {}
