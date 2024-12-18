import { Inject, Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../../database';
import { UserDb } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @Inject(SEQUELIZE)
    private readonly sequelize: Sequelize,
  ) {}

  async getUserByEmail(email: string): Promise<UserDb | null> {
    const [user] = await this.sequelize.query<UserDb>('select * from users where email = :email limit 1', {
      type: QueryTypes.SELECT,
      replacements: { email },
    });

    return user ?? null;
  }

  async getUserById(id: number): Promise<UserDb | null> {
    const [user] = await this.sequelize.query<UserDb>('select * from users where id = :id limit 1', {
      type: QueryTypes.SELECT,
      replacements: { id },
    });

    return user ?? null;
  }
}
