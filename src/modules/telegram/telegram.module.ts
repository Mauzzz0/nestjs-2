import { Module } from '@nestjs/common';
import { telegramProvider } from './telegram.provider';
import { TelegramRabbitController } from './telegram.rabbit-controller';
import { TelegramService } from './telegram.service';

@Module({
  providers: [TelegramService, telegramProvider],
  exports: [TelegramService, telegramProvider],
  controllers: [TelegramRabbitController],
})
export class TelegramModule {}
