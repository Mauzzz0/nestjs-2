import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TELEGRAM_BOT } from './telegram.constants';

@Injectable()
export class TelegramService implements OnModuleInit {
  constructor(
    @Inject(TELEGRAM_BOT)
    private readonly bot: Telegraf,
  ) {}

  public async onModuleInit() {
    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }

  public async sendMessage(...args: Parameters<typeof this.bot.telegram.sendMessage>) {
    await this.bot.telegram.sendMessage(...args);

    return true;
  }
}
