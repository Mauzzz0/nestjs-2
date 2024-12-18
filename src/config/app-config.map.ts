import { AppConfigDto } from './dto';

type EnvStructure<T = any> = {
  [key in keyof T]: T[key] extends object ? EnvStructure<T[key]> : string | undefined;
};

const appConfigMap = (): EnvStructure<AppConfigDto> => ({
  port: process.env.PORT,
  passwordRound: process.env.PASSWORD_ROUNDS,
  telegramToken: process.env.TELEGRAM_TOKEN,
  rabbitUrl: process.env.RABBIT_URL,
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
});

export default appConfigMap;
