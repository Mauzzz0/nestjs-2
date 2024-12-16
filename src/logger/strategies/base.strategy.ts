import { LoggerOptions } from 'pino';

export const BASE_STRATEGY: LoggerOptions = {
  messageKey: 'message',
  errorKey: 'message',
  timestamp: false,
  serializers: { err: (value: any) => value },
  formatters: {
    level: (level) => {
      return { level: level.toLocaleUpperCase() };
    },
  },
  mixin: () => {
    return { timestamp: new Date().toISOString() };
  },
};
