import { Logger, Provider } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { AppConfigService } from '../../config';
import { TELEGRAM_BOT } from './telegram.constants';

export const telegramProvider: Provider<Telegraf> = {
  provide: TELEGRAM_BOT,
  useFactory: async (appConfigService: AppConfigService) => {
    const logger = new Logger('Telegram');

    const bot = new Telegraf(appConfigService.env.telegramToken);

    bot.launch();

    logger.log('Telegram bot successfully launched');

    return bot;
  },
  inject: [AppConfigService],
};
