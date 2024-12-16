import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateTaskDto, FindAllTaskQueryDto } from './dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get('')
  @ApiOperation({ summary: 'Список задач' })
  async findAll(@Query() dto: FindAllTaskQueryDto) {
    return this.service.findAll(dto);
  }

  @Post('')
  @ApiOperation({ summary: 'Создать новую задачу' })
  async getUserById(@Body() dto: CreateTaskDto) {
    return this.service.create(dto);
  }
}
