import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule } from './config';
import { DatabaseModule } from './database';
import { HealthCheckModule } from './health-check/health-check.module';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [HealthCheckModule, AppConfigModule, DatabaseModule, TelegramModule, AuthModule, UserModule, TaskModule],
  controllers: [AppController],
})
export class AppModule {}
