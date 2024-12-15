import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/:id')
  async getUserById(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.getUserById(id);
  }
}
