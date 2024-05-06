import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('manager')
@ApiTags('Manager Module')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('create')
  @HttpCode(201)
  async createManager(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.createManager(createManagerDto);
  }

  @Get()
  findAll() {
    return this.managerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(+id, updateManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}
