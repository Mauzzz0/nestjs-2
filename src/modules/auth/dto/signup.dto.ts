import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'example@mail.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;
}
