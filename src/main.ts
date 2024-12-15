import { Logger, ShutdownSignal } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { APP_NAME, APP_VERSION } from './app.constants';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app.config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.enableShutdownHooks([ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM]);

  const configService = app.get<AppConfigService>(AppConfigService);
  await app.listen({ port: configService.port, host: '127.0.0.1' });

  const logger = new Logger('Bootstrap');

  logger.log(`Listening on ${JSON.stringify(app.getHttpServer().address())}`);
  logger.log(`Application "${APP_NAME}" version ${APP_VERSION} has started`);
}

bootstrap();
