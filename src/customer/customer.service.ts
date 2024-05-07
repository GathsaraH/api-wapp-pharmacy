import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerEntity } from "src/entites/customer.rntity";
import { Repository } from "typeorm";
import { RoleEntity } from "src/entites/role.entity";
import { RoleEnum } from "src/auth/guards/role.enum";

@Injectable()
export class CustomerService {
  private logger: Logger = new Logger(CustomerService.name);
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {}
  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<void> {
    try {
      this.logger.debug(
        `Creating customer with data: ${JSON.stringify(createCustomerDto)}`
      );
      const role = await this.roleRepository.findOne({
        where: {
          name: RoleEnum.Customer,
        },
      });
      if (!role) throw new NotFoundException("Role not found");
      const customer = this.customerRepository.create({
        name: createCustomerDto.name,
        phoneNumber: createCustomerDto.phoneNumber,
        age: createCustomerDto.age,
        height: createCustomerDto.height,
        roleId: role.roleId as unknown as RoleEntity,
      });
      await this.customerRepository.save(customer);
    } catch (error) {
      this.logger.error(`Error creating customer: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAllCustomers(): Promise<CustomerEntity[]> {
    try {
      this.logger.debug(`Fetching all customers`);
      const customers = await this.customerRepository.find();
      if (!customers.length) {
        throw new HttpException("No customers found", HttpStatus.NOT_FOUND);
      }
      return customers;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateCustomer(
    customerId: string,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<void> {
    try {
      this.logger.debug(
        `Updating customer with id: ${customerId} with data: ${JSON.stringify(
          updateCustomerDto
        )}`
      );
      const customer = await this.customerRepository.findOne({
        where: { customerId },
      });
      if (!customer) {
        throw new NotFoundException("Customer not found");
      }
      await this.customerRepository.update(
        { customerId },
        { ...updateCustomerDto }
      );
    } catch (error) {
      this.logger.error(`Error updating customer: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeSoftCustomer(customerId: string): Promise<void> {
    try {
      this.logger.debug(`Removing customer with id: ${customerId}`);
      const customer = await this.customerRepository.findOne({
        where: { customerId },
      });
      if (!customer) {
        throw new NotFoundException("Customer not found");
      }
      await this.customerRepository.update(
        { customerId },
        { isArchived: true }
      );
    } catch (error) {
      this.logger.error(`Error removing customer: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async removeCustomer(customerId: string): Promise<void> {
    try {
      this.logger.debug(`Removing customer with id: ${customerId}`);
      const customer = await this.customerRepository.findOne({
        where: { customerId },
      });
      if (!customer) {
        throw new NotFoundException("Customer not found");
      }
      await this.customerRepository.delete({ customerId });
    } catch (error) {
      this.logger.error(`Error removing customer: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
