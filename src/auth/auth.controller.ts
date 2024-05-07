import { Public } from "./guards/public.metadata";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login";

@ApiTags("Auth Module")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  async login(
    @Body() createAuthDto: LoginDto
  ): Promise<{ accessToken: string }> {
    return this.authService.login(createAuthDto);
  }
}
