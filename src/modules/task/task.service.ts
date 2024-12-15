import { Inject, Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../../database';
import { CreateTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject(SEQUELIZE)
    private readonly sequelize: Sequelize,
  ) {}

  async create(dto: CreateTaskDto) {
    const [task] = await this.sequelize.query('insert into tasks (title) values (:title) returning *', {
      type: QueryTypes.INSERT,
      replacements: {
        title: dto.title,
      },
    });

    return task;
  }
}
