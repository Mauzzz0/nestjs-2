import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import appConfigLoad from './app-config-load';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfigLoad],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
