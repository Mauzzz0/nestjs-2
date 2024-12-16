import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  async signup(@Body() dto: SignupDto) {
    const result = await this.authService.signup(dto);

    return { result };
  }

  @Post('login')
  @ApiOperation({ summary: 'Логин' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
