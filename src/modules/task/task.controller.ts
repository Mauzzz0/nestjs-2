import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Post('')
  async getUserById(@Body() dto: CreateTaskDto) {
    return this.service.create(dto);
  }
}
