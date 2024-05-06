import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppConfigModule } from "./configs/app-config/app.config.module";
import { DatabaseModule } from "./configs/database-config/database.module";
import { UserModule } from "./user/user.module";
import { CustomerModule } from "./customer/customer.module";
import { MedicationModule } from "./medication/medication.module";
import { AuthModule } from './auth/auth.module';
import { TerminusModule } from "@nestjs/terminus";
import { ManagerModule } from './manager/manager.module';
import { CashierModule } from './cashier/cashier.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    CustomerModule,
    MedicationModule,
    AuthModule,
    TerminusModule,
    ManagerModule,
    CashierModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
