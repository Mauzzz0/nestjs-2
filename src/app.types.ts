import { FastifyRequest } from 'fastify';
import { UserDb } from './modules/user/user.types';

export type RequestWithUser = FastifyRequest & {
  user: UserDb;
};

export enum Roles {
  user = 'user',
  admin = 'admin',
}
