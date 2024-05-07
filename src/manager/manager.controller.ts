import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ApiTags } from '@nestjs/swagger';
import { ManagerEntity } from 'src/entites/manager.entity';

@Controller('manager')
@ApiTags('Manager Module')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('create')
  @HttpCode(201)
  async createManager(@Body() createManagerDto: CreateManagerDto):Promise<void> {
    return this.managerService.createManager(createManagerDto);
  }

  @Get('all')
  @HttpCode(200)
  async findAllManagers():Promise<ManagerEntity[]> {
    return this.managerService.findAllManagers();
  }

  @Patch('update/:managerId')
 async updateManager(@Param('managerId') managerId: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.updateManager(managerId, updateManagerDto);
  }

  @Delete('remove-soft/:managerId')
  async removeSoftManager(@Param('managerId') managerId: string) {
    return this.managerService.removeSoftManager(managerId);
  }


  @Delete('remove/:managerId')
  async removeManager(@Param('managerId') managerId: string) {
    return this.managerService.removeManager(managerId);
  }
}
