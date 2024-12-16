import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Sequelize } from 'sequelize-typescript';
import { AppConfigService } from '../../config';
import { SEQUELIZE } from '../../database';
import { UserService } from '../user/user.service';
import { UserDb } from '../user/user.types';
import { TokenPair } from './auth.types';
import { LoginDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SEQUELIZE)
    private readonly sequelize: Sequelize,

    private readonly appConfigService: AppConfigService,

    private readonly userService: UserService,
  ) {}

  async signup(dto: SignupDto) {
    const exists = await this.userService.getUserByEmail(dto.email);

    if (exists) {
      throw new ConflictException(`User already exists`);
    }

    dto.password = hashSync(dto.password, this.appConfigService.env.passwordRound);

    return this.userService.saveNewUser(dto);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.getUserByEmail(dto.email);

    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException();
    }

    return this.makeTokenPair(user);
  }

  async verify(token: string, type: 'access' | 'refresh'): Promise<boolean> {
    const secrets = {
      access: this.appConfigService.env.jwt.accessSecret,
      refresh: this.appConfigService.env.jwt.refreshSecret,
    };

    return new Promise((resolve, reject) => {
      jwt.verify(token, secrets[type], (err) => {
        if (err) {
          reject(err);
        }

        resolve(true);
      });
    });
  }

  async decode(token: string, type: 'access' | 'refresh'): Promise<UserDb> {
    const valid = await this.verify(token, 'access');

    if (!valid) {
      throw new UnauthorizedException();
    }

    const decoded = jwt.decode(token, { json: true });

    if (!decoded) {
      throw new UnauthorizedException();
    }

    return decoded as UserDb;
  }

  private makeTokenPair(user: UserDb): TokenPair {
    const payload = { ...user };

    const accessToken = jwt.sign(payload, this.appConfigService.env.jwt.accessSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, this.appConfigService.env.jwt.refreshSecret);

    return { accessToken, refreshToken };
  }
}
