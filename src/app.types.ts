import { Request } from 'express';
import { UserDb } from './modules/user/user.types';

export type RequestWithUser = Request & {
  user: UserDb;
};

export enum Roles {
  user = 'user',
  admin = 'admin',
}
