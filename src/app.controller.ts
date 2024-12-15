import { Controller, Get, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from './database';

@Controller()
export class AppController {
  constructor(@Inject(SEQUELIZE) private readonly sequelize: Sequelize) {}

  @Get('pg-version')
  async pgVersion() {
    const [version] = await this.sequelize.query('select version()');
    return version;
  }
}
