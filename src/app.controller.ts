import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "./auth/guards/public.metadata";

@ApiTags("Health Check")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  healthCheck() {
    return this.appService.healthCheck();
  }
}
