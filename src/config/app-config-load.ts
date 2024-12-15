import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CONFIG_BASE_PATH } from './app-config.constants';
import appConfigMap from './app-config.map';
import { AppConfigDto } from './dto';

const appConfigLoad = registerAs(CONFIG_BASE_PATH, () => {
  const logger = new Logger();
  const instance = plainToInstance(AppConfigDto, appConfigMap());
  const errors = validateSync(instance);

  if (errors.length) {
    logger.error('Config validation error');
    errors.forEach((error) => {
      logger.error(error.toString());
    });
    logger.warn('Process will now exit');
    throw Error('Envs validation failed');
  }

  return instance;
});

export default appConfigLoad;
