import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ChannelWrapper } from 'amqp-connection-manager';
import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { appConfig } from '../../config';
import { SEQUELIZE } from '../../database';
import { RABBIT_CHANNEL } from '../../message-broker/rabbit.constants';
import { TelegramMessage } from '../../message-broker/rabbit.messages';
import { TELEGRAM_MESSAGE_QUEUE } from '../../message-broker/rabbit.queues';
import { UserService } from '../user/user.service';
import { UserDb } from '../user/user.types';
import { TokenPair } from './auth.types';
import { LoginDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SEQUELIZE)
    private readonly sequelize: Sequelize,

    @Inject(RABBIT_CHANNEL)
    private readonly rabbit: ChannelWrapper,

    private readonly userService: UserService,
  ) {}

  async signup(dto: SignupDto) {
    const exists = await this.userService.getUserByEmail(dto.email);

    if (exists) {
      throw new ConflictException(`User already exists`);
    }

    dto.password = hashSync(dto.password, appConfig.passwordRound);

    await this.sequelize.query('insert into users (name, email, password) values (:name, :email, :password)', {
      type: QueryTypes.INSERT,
      replacements: { ...dto },
    });

    const user = await this.userService.getUserByEmail(dto.email);

    if (user) {
      const message: TelegramMessage = {
        chatId: 834333336,
        text: `Зарегистрирован новый пользователь (id=${user.id}, email=${user.email})`,
      };

      await this.rabbit.sendToQueue(TELEGRAM_MESSAGE_QUEUE, Buffer.from(JSON.stringify(message), 'utf-8'));
    }

    return true;
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
      access: appConfig.jwt.accessSecret,
      refresh: appConfig.jwt.refreshSecret,
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

    const accessToken = jwt.sign(payload, appConfig.jwt.accessSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, appConfig.jwt.refreshSecret);

    return { accessToken, refreshToken };
  }
}
