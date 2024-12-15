import { Inject, Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../../database';

@Injectable()
export class UserService {
  constructor(
    @Inject(SEQUELIZE)
    private readonly sequelize: Sequelize,
  ) {}

  async getUserById(id: number) {
    const [user] = await this.sequelize.query('select * from users where id = :id limit 1', {
      type: QueryTypes.SELECT,
      replacements: { id },
    });

    return user;
  }
}
