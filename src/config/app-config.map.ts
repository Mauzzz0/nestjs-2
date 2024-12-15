import { AppConfigDto } from './dto';

type EnvStructure<T = any> = {
  [key in keyof T]: T[key] extends object ? EnvStructure<T[key]> : string | undefined;
};

const appConfigMap = (): EnvStructure<AppConfigDto> => ({
  port: process.env.PORT,
});

export default appConfigMap;
