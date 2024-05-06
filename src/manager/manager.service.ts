import { Injectable, Logger } from "@nestjs/common";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ManagerEntity } from "src/entites/manager.entity";
import { Repository } from "typeorm";

@Injectable()
export class ManagerService {
  private ligger: Logger = new Logger(ManagerService.name);
  constructor(
    @InjectRepository(ManagerEntity)
    private readonly managerRepository: Repository<ManagerEntity>
  ) {}
  async createManager(createManagerDto: CreateManagerDto) {
    return "This action adds a new manager";
  }

  findAll() {
    return `This action returns all manager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manager`;
  }

  update(id: number, updateManagerDto: UpdateManagerDto) {
    return `This action updates a #${id} manager`;
  }

  remove(id: number) {
    return `This action removes a #${id} manager`;
  }
}
