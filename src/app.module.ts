import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule } from './config';
import { DatabaseModule } from './database';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
