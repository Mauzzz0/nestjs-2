import { Logger, Provider } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { appConfig } from '../../config';
import { TELEGRAM_BOT } from './telegram.constants';

export const telegramProvider: Provider<Telegraf> = {
  provide: TELEGRAM_BOT,
  useFactory: async () => {
    const logger = new Logger('Telegram');

    const bot = new Telegraf(appConfig.telegramToken);

    bot.launch();

    logger.log('Telegram bot successfully launched');

    return bot;
  },
};
