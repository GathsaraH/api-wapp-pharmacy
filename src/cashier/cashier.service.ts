import { CashierEntity } from "src/entites/cashier.entity";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CreateCashierDto } from "./dto/create-cashier.dto";
import { UpdateCashierDto } from "./dto/update-cashier.dto";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { EmailService } from "src/email/email.service";
import { UserEntity } from "src/entites/user.entity";
import { RoleEntity } from "src/entites/role.entity";
import { generatePassword } from "src/util/generate-password";
import * as bcrypt from "bcrypt";
import { RoleEnum } from "src/auth/guards/role.enum";

@Injectable()
export class CashierService {
  private logger: Logger = new Logger(CashierService.name);
  constructor(
    @InjectRepository(CashierEntity)
    private readonly cashierRepository: Repository<CashierEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly emailService: EmailService
  ) {}
  async createCashier(createCashierDto: CreateCashierDto): Promise<void> {
    try {
      this.logger.debug(
        `Creating cashier with data: ${JSON.stringify(createCashierDto)}`
      );
      await this.entityManager.transaction(async (entityManager) => {
        await this.checkUsername(entityManager, createCashierDto.userName);
        await this.checkEmail(entityManager, createCashierDto.email);
        const role = await this.getRole(entityManager);
        const password = this.generatePassword();
        const user = await this.createUser(
          entityManager,
          role,
          createCashierDto.userName,
          password
        );
        await this.createCashierEntity(
          entityManager,
          user,
          createCashierDto.name,
          createCashierDto.email
        );
        await this.emailService.sendRegistrationEmail(
          createCashierDto.email,
          createCashierDto.name,
          createCashierDto.userName,
          password,
          role.name
        );
      });
    } catch (error) {
      this.logger.error(`Error creating cashier: ${JSON.stringify(error)}`);
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
      .getRepository(CashierEntity)
      .findOne({ where: { email: useEmail } });
    if (email) {
      throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST);
    }
    return email;
  }

  private async getRole(entityManager: EntityManager) {
    const role = await entityManager
      .getRepository(RoleEntity)
      .findOne({ where: { name: RoleEnum.Cashier } });
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
  private async createCashierEntity(
    entityManager: EntityManager,
    user: UserEntity,
    name: string,
    email: string
  ) {
    const manager = entityManager.getRepository(CashierEntity).create({
      userId: user.userId as unknown as UserEntity,
      name,
      email,
    });
    return await entityManager.getRepository(CashierEntity).save(manager);
  }

  async findAllCashier(): Promise<CashierEntity[]> {
    try {
      this.logger.debug(`Fetching all cashiers`);
      const cashiers = await this.cashierRepository.find();
      if (!cashiers.length) {
        throw new HttpException("No cashiers found", HttpStatus.NOT_FOUND);
      }
      return cashiers;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateCashier(cashierId: string, dto: UpdateCashierDto): Promise<void> {
    try {
      this.logger.debug(
        `Updating cashier with id: ${cashierId} with data: ${JSON.stringify(
          dto
        )}`
      );
      await this.entityManager.transaction(async (entityManager) => {
        const cashier = await this.cashierRepository.findOne({
          where: { cashierId },
        });
        if (!cashier) {
          throw new HttpException("Cashier not found", HttpStatus.NOT_FOUND);
        }
        if (dto.email) {
          await this.checkEmail(entityManager, dto.email);
        }
        if (dto.userName) {
          await this.checkUsername(entityManager, dto.userName);
        }
        await this.cashierRepository.update({ cashierId }, { ...dto });
      });
    } catch (error) {
      this.logger.error(`Error updating cashier: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeCashier(cashierId: string): Promise<void> {
    try {
      this.logger.debug(`Removing cashier with id: ${cashierId}`);
      await this.entityManager.transaction(async (entityManager) => {
        const cashier = await entityManager
          .getRepository(CashierEntity)
          .findOne({
            where: { cashierId },
            relations: ["userId"],
          });
        if (!cashier) {
          throw new HttpException("Cashier not found", HttpStatus.NOT_FOUND);
        }

        await entityManager.getRepository(CashierEntity).delete({ cashierId });

        await entityManager
          .getRepository(UserEntity)
          .delete({ userId: String(cashier.userId.userId) });
      });
    } catch (error) {
      this.logger.error(`Error removing cashier: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
