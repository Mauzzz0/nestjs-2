import { Controller, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { ChannelWrapper } from 'amqp-connection-manager';
import { setTimeout } from 'node:timers/promises';
import { RABBIT_CHANNEL } from '../../message-broker/rabbit.constants';
import { TelegramMessage } from '../../message-broker/rabbit.messages';
import { TELEGRAM_MESSAGE_QUEUE } from '../../message-broker/rabbit.queues';
import { TelegramService } from './telegram.service';

@Controller()
export class TelegramRabbitController implements OnModuleInit {
  private readonly logger = new Logger(TelegramRabbitController.name);

  constructor(
    private telegramService: TelegramService,
    @Inject(RABBIT_CHANNEL)
    private readonly rabbitChannel: ChannelWrapper,
  ) {}

  async onModuleInit() {
    await this.rabbitChannel.consume(
      TELEGRAM_MESSAGE_QUEUE,
      async (message) => {
        try {
          const json: TelegramMessage = JSON.parse(message.content.toString('utf-8'));

          await this.telegramService.sendMessage(json.chatId, json.text);

          // Ack - принять сообщение (удалить его из RabbitMQ)
          this.rabbitChannel.ack(message);
        } catch (error: any) {
          this.logger.error('Error during processing RabbitMQ Telegram Message', error?.message);

          // Небольшая задержка, чтобы не спамить ошибкой 1000раз в секунду
          await setTimeout(1000);

          // NoAck - отклонить сообщение (оставить его в RabbitMQ)
          this.rabbitChannel.nack(message);
        }
      },
      { prefetch: 1, noAck: false },
    );
  }
}
