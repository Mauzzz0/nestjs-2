import { Global, Module } from '@nestjs/common';
import { AmqpConnectionManager, connect } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { appConfig } from '../config';
import { RABBIT_CHANNEL } from './rabbit.constants';
import { QUEUES } from './rabbit.queues';

const RABBIT_CONNECTION = Symbol('RABBIT_CONNECTION');

const providers = [
  {
    provide: RABBIT_CONNECTION,
    useFactory: () => {
      return connect(appConfig.rabbitUrl);
    },
  },
  {
    provide: RABBIT_CHANNEL,
    useFactory: (connection: AmqpConnectionManager) => {
      return connection.createChannel({
        setup: async (channel: Channel) => {
          for (const queue of QUEUES) {
            await channel.assertQueue(queue, { durable: true });
          }
        },
      });
    },
    inject: [RABBIT_CONNECTION],
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class RabbitModule {}
