import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppController } from './app.controller';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: true,
      port: 3009,
    }),
    HealthCheckModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
