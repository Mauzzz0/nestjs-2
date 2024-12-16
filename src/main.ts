import { ShutdownSignal } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { APP_NAME, APP_VERSION } from './app.constants';
import { AppModule } from './app.module';
import { bootstrapPipes, bootstrapSwagger } from './bootstrap';
import { AppConfigService } from './config';
import { ExceptionFilter } from './filters';
import { DEVELOPMENT_STRATEGY, PinoService, PRODUCTION_STRATEGY } from './logger';

async function bootstrap() {
  const pinoStrategy = process.env.NODE_ENV === 'development' ? DEVELOPMENT_STRATEGY : PRODUCTION_STRATEGY;
  const logger = new PinoService(pinoStrategy);

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { logger });

  app.useGlobalFilters(new ExceptionFilter());

  app.enableShutdownHooks([ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM]);

  bootstrapSwagger(app);
  bootstrapPipes(app);

  const configService = app.get<AppConfigService>(AppConfigService);
  await app.listen({ port: configService.port, host: '127.0.0.1' });

  const context = 'Bootstrap';
  logger.log(`Listening on ${JSON.stringify(app.getHttpServer().address())}`, context);
  logger.log(`Application "${APP_NAME}" version ${APP_VERSION} has started`, context);
}

bootstrap();
