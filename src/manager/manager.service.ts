import { name } from "./../../node_modules/@types/ejs/index.d";
import { RoleEntity } from "src/entites/role.entity";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { ManagerEntity } from "src/entites/manager.entity";
import { EntityManager, Repository } from "typeorm";
import { RoleEnum } from "src/auth/guards/role.enum";
import { UserEntity } from "src/entites/user.entity";
import { generatePassword } from "src/util/generate-password";
import * as bcrypt from "bcrypt";
import { EmailService } from "src/email/email.service";

@Injectable()
export class ManagerService {
  private logger: Logger = new Logger(ManagerService.name);
  constructor(
    @InjectRepository(ManagerEntity)
    private readonly managerRepository: Repository<ManagerEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly emailService: EmailService
  ) {}
  async createManager(dto: CreateManagerDto) {
    try {
      this.logger.debug(`Creating manager with data: ${JSON.stringify(dto)}`);
      await this.entityManager.transaction(async (entityManager) => {
        await this.checkUsername(entityManager, dto.userName);
        await this.checkEmail(entityManager, dto.email);
        const role = await this.getRole(entityManager);
        const password = this.generatePassword();
        const user = await this.createUser(
          entityManager,
          role,
          dto.userName,
          password
        );
        await this.createManagerEntity(
          entityManager,
          user,
          dto.name,
          dto.email
        );
        await this.emailService.sendRegistrationEmail(
          dto.email,
          dto.name,
          dto.userName,
          password,
          role
        );
      });
    } catch (error) {
      this.logger.error(`Error creating manager: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async checkUsername(entityManager: EntityManager, userName: string) {
    const username = await entityManager
      .getRepository(UserEntity)
      .findOne({ where: { userName } });
    if (username) {
      throw new HttpException(
        "Username already exists",
        HttpStatus.BAD_REQUEST
      );
    }
    return username;
  }

  private async checkEmail(entityManager: EntityManager, useEmail: string) {
    const email = await entityManager
      .getRepository(ManagerEntity)
      .findOne({ where: { email: useEmail } });
    if (email) {
      throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST);
    }
    return email;
  }

  private async getRole(entityManager: EntityManager) {
    const role = await entityManager
      .getRepository(RoleEntity)
      .findOne({ where: { name: RoleEnum.Manager } });
    if (!role) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
    }
    return role;
  }

  private generatePassword() {
    const password = generatePassword();
    this.logger.debug(`Generated password!`);
    return password;
  }

  private async createUser(
    entityManager: EntityManager,
    role: RoleEntity,
    userName: string,
    password: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.logger.debug(`Password hash success`);
    const user = entityManager.getRepository(UserEntity).create({
      roleId: role.roleId as unknown as RoleEntity,
      userName,
      password: hashedPassword,
    });
    return await entityManager.getRepository(UserEntity).save(user);
  }

  private async createManagerEntity(
    entityManager: EntityManager,
    user: UserEntity,
    name: string,
    email: string
  ) {
    const manager = entityManager.getRepository(ManagerEntity).create({
      userId: user.userId as unknown as UserEntity,
      name,
      email,
    });
    return await entityManager.getRepository(ManagerEntity).save(manager);
  }

  async findAllManagers(): Promise<ManagerEntity[]> {
    try {
      this.logger.debug(`Getting all managers`);
      const managers = await this.managerRepository.find();
      if (!managers) {
        throw new HttpException("No managers found", HttpStatus.NOT_FOUND);
      }
      return managers;
    } catch (error) {
      this.logger.error(`Error getting all managers: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateManager(managerId: string, dto: UpdateManagerDto) {
    try {
      this.logger.debug(`Updating manager with id: ${managerId}`);
      await this.entityManager.transaction(async (entityManager) => {
        const manager = entityManager
          .getRepository(ManagerEntity)
          .findOne({ where: { managerId } });
        if (!manager) {
          throw new HttpException("Manager not found", HttpStatus.NOT_FOUND);
        }
        if (dto.email) {
          await this.checkEmail(entityManager, dto.email);
        }
        if (dto.userName) {
          await this.checkUsername(entityManager, dto.userName);
        }
        await entityManager
          .getRepository(ManagerEntity)
          .update({ managerId }, { ...dto });
      });
    } catch (error) {
      this.logger.error(`Error updating manager: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeSoftManager(managerId: string) {
    try {
      this.logger.debug(`Removing manager with soft id: ${managerId}`);
      await this.managerRepository.update({ managerId }, { isArchived: true });
    } catch (error) {
      this.logger.error(`Error removing manager (soft): ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeManager(managerId: string) {
    try {
      this.logger.debug(`Removing manager with id: ${managerId}`);
      await this.managerRepository.delete({ managerId });
    } catch (error) {
      this.logger.error(`Error removing manager: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
