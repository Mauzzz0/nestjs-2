import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { NestedConfigDto } from '../../decorators/nested.config.dto';

export class PostgresReplicaConfigDto {
  @IsString()
  @IsNotEmpty()
  readonly host: string;

  @IsNumber()
  @Type(() => Number)
  readonly port: number;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly database: string;
}

export class PostgresConfigDto {
  @NestedConfigDto(PostgresReplicaConfigDto)
  readonly read: PostgresReplicaConfigDto;

  @NestedConfigDto(PostgresReplicaConfigDto)
  readonly write: PostgresReplicaConfigDto;
}
