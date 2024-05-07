import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entites/user.entity";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async login(dto: LoginDto):Promise<{accessToken:string}> {
    try {
      this.logger.debug(`Authenticating user with email: ${dto.userName}`);
      const user = await this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.roleId", "roleId")
        .where("user.userName = :userName", { userName: dto.userName })
        .getOne();
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const isPasswordMatching = await bcrypt.compare(
        dto.password,
        user.password
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          "Wrong credentials provided",
          HttpStatus.BAD_REQUEST
        );
      }
      const userAccessToken = {
        id: user.userId,
        userName: user.userName,
        roles: user.roleId.name,
      };
      return {
        accessToken: await this.jwtService.signAsync(userAccessToken),
      }
    } catch (error) {
      this.logger.error(`Error authenticating user: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
