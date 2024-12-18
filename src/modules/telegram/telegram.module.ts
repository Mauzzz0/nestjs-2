import { Module } from '@nestjs/common';
import { telegramProvider } from './telegram.provider';
import { TelegramService } from './telegram.service';

@Module({
  providers: [TelegramService, telegramProvider],
  exports: [TelegramService, telegramProvider],
})
export class TelegramModule {}
