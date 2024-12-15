import { Logger, ShutdownSignal } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { APP_NAME, APP_VERSION } from './app.constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.enableShutdownHooks([ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM]);

  await app.listen({ port: 2000, host: '127.0.0.1' });

  const logger = new Logger('Bootstrap');

  logger.log(`Listening on ${JSON.stringify(app.getHttpServer().address())}`);
  logger.log(`Application "${APP_NAME}" version ${APP_VERSION} has started`);
}

bootstrap();
