import { Global, Module } from '@nestjs/common';
import { sequelizeProvider } from './sequelize.provider';

@Global()
@Module({
  providers: [sequelizeProvider],
  exports: [sequelizeProvider],
})
export class DatabaseModule {}
