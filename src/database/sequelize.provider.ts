import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { AppConfigService } from '../config';

export const SEQUELIZE = 'SEQUELIZE';

export const sequelizeProvider: Provider<Sequelize> = {
  provide: SEQUELIZE,
  useFactory: async (config: AppConfigService): Promise<Sequelize> => {
    const sequelize: Sequelize = new Sequelize({
      dialect: 'postgres',
      logging: false,
      ...config.env.postgres,
    });

    await sequelize.authenticate();

    return sequelize;
  },
  inject: [AppConfigService],
};
