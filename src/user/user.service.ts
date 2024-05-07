import { HttpException, Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entites/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { generatePassword } from "src/util/generate-password";

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      this.logger.debug(
        `Creating user with data: ${JSON.stringify(createUserDto)}`
      );
      const userNameValidation = await this.userRepository.findOne({
        where: { userName: createUserDto.userName },
      });
      if (userNameValidation) {
        throw new HttpException("Username already exists", 400);
      }
      const password = generatePassword();
      this.logger.debug(`Generated password!`);
      const hashedPassword = await bcrypt.hash(password, 10);
      this.logger.debug(`Password hash success`);
      const user = this.userRepository.create({
        roleId: createUserDto.roleId,
        userName: createUserDto.userName,
        password: hashedPassword,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
