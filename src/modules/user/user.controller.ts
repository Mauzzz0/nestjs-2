import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../../app.types';
import { User } from '../../decorators';
import { Role } from '../../decorators/role';
import { AuthGuard } from '../../guards';
import { RolesGuard } from '../../guards/role.guard';
import { UserService } from './user.service';
import { UserDb } from './user.types';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({ summary: 'Получить пользователя из текущего Access токена' })
  @Get('/profile')
  async getProfile(@User() user: UserDb) {
    return user;
  }

  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @Role(Roles.admin)
  @Get('/:id')
  async getUserById(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.getUserById(id);
  }
}
