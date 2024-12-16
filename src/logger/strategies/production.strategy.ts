import { LoggerOptions } from 'pino';
import { APP_NAME, APP_VERSION } from '../../app.constants';
import { BASE_STRATEGY } from './base.strategy';

export const PRODUCTION_STRATEGY: LoggerOptions = {
  ...BASE_STRATEGY,
  formatters: {
    ...BASE_STRATEGY.formatters,
    bindings: () => ({
      appName: APP_NAME,
      appVersion: APP_VERSION,
    }),
  },
};
