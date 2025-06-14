import { ShutdownSignal } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { APP_NAME, APP_VERSION } from './app.constants';
import { AppModule } from './app.module';
import { bootstrapPipes, bootstrapSwagger } from './bootstrap';
import { GlobalExceptionFilter } from './filters/global.exception-filter';
import { JsonApiSerializerInterceptor } from './interceptors/JsonApiSerializer.interceptor';
import { DEVELOPMENT_STRATEGY, PinoService, PRODUCTION_STRATEGY } from './logger';

async function bootstrap() {
  const pinoStrategy = process.env.NODE_ENV === 'production' ? PRODUCTION_STRATEGY : DEVELOPMENT_STRATEGY;
  const logger = new PinoService(pinoStrategy);

  const app = await NestFactory.create(AppModule, {
    logger,
    snapshot: true,
  });

  app.useGlobalInterceptors(new JsonApiSerializerInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableShutdownHooks([ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM]);

  bootstrapSwagger(app);
  bootstrapPipes(app);

  await app.listen(2000);

  const context = 'Bootstrap';
  logger.log(`Listening on ${JSON.stringify(app.getHttpServer().address())}`, context);
  logger.log(`Application "${APP_NAME}" version ${APP_VERSION} has started`, context);
}

bootstrap();
