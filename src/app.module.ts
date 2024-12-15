import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule } from './config';
import { DatabaseModule } from './database';

@Module({
  imports: [AppConfigModule, DatabaseModule],
  controllers: [AppController],
})
export class AppModule {}
