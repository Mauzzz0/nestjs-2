import { Inject, Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../../database';
import { CreateTaskDto, FindAllTaskQueryDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject(SEQUELIZE)
    private readonly sequelize: Sequelize,
  ) {}

  async findAll(dto: FindAllTaskQueryDto) {
    const { limit, offset, search, sortBy, sortDirection } = dto;

    const filters: string[] = [];
    const replacements: Record<string, unknown> = { limit, offset, sortBy, sortDirection };

    if (search) {
      filters.push(`title ilike :search`);
      replacements.search = `%${search}%`;
    }

    const options = { type: QueryTypes.SELECT, replacements } as const;

    const query = `
     select * from tasks
     ${filters.length ? 'where ' + filters.join(' and ') : ''}`;

    const [data, [{ total }]] = await Promise.all([
      this.sequelize.query(
        `${query}
        order by ${sortBy} ${sortDirection}
        limit :limit offset :offset`,
        options,
      ),
      this.sequelize.query<{ total: number }>(`select count(*)::integer as total from (${query}) t`, options),
    ]);

    return { limit, offset, total, data };
  }

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
