import { BadRequestException, Controller, Get, NotFoundException, Query, UnauthorizedException } from '@nestjs/common';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ExampleQueryDto {
  @IsString()
  name: string;

  @IsNumber()
  age: string;

  @IsBoolean()
  isMale: boolean;
}

@Controller()
export class AppController {
  @Get('bad-request-query-auto')
  public bra(@Query() q: ExampleQueryDto) {}

  @Get('bad-request-manual')
  public brm() {
    throw new BadRequestException('Плохие данные');
  }

  @Get('unauthorized')
  public un() {
    throw new UnauthorizedException('Неверный пароль');
  }

  @Get('not-found')
  public nf() {
    throw new NotFoundException('Такого нет');
  }
}
