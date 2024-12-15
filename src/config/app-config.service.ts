import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIG_BASE_PATH } from './app-config.constants';
import { AppConfigDto } from './dto';

@Injectable()
export class AppConfigService {
  private readonly logger = new Logger(AppConfigService.name);

  constructor(private config: ConfigService) {}

  public get env(): AppConfigDto {
    const config = this.config.get<AppConfigDto>(CONFIG_BASE_PATH);

    if (!config) {
      this.logger.error(`Config [${CONFIG_BASE_PATH}] is not set`);
      this.logger.error('Exit process');
      process.exit(1);
    }

    return config;
  }

  public get port(): number {
    return this.env.port;
  }
}
