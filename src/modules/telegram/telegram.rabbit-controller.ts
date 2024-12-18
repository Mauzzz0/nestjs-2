import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ChannelWrapper } from 'amqp-connection-manager';
import { RABBIT_CHANNEL } from '../../message-broker/rabbit.constants';
import { TelegramMessage } from '../../message-broker/rabbit.messages';
import { TELEGRAM_MESSAGE_QUEUE } from '../../message-broker/rabbit.queues';
import { TelegramService } from './telegram.service';

@Controller()
export class TelegramRabbitController implements OnModuleInit {
  constructor(
    private telegramService: TelegramService,
    @Inject(RABBIT_CHANNEL)
    private readonly rabbitChannel: ChannelWrapper,
  ) {}

  async onModuleInit() {
    await this.rabbitChannel.consume(
      TELEGRAM_MESSAGE_QUEUE,
      async (message) => {
        const json: TelegramMessage = JSON.parse(message.content.toString('utf-8'));

        await this.telegramService.sendMessage(json.chatId, json.text);

        this.rabbitChannel.ack(message);
      },
      { prefetch: 1, noAck: false },
    );
  }
}
