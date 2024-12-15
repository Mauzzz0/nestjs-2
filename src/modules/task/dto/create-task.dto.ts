import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Купить продукты' })
  @IsString()
  @MinLength(1)
  title: string;
}
