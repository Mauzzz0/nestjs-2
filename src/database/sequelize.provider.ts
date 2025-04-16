import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { appConfig } from '../config';

export const SEQUELIZE = 'SEQUELIZE';

export const sequelizeProvider: Provider<Sequelize> = {
  provide: SEQUELIZE,
  useFactory: async (): Promise<Sequelize> => {
    const sequelize: Sequelize = new Sequelize({
      dialect: 'postgres',
      logging: false,
      ...appConfig.postgres,
    });

    await sequelize.authenticate();

    return sequelize;
  },
};
