import { FastifyRequest } from 'fastify';
import { UserDb } from './modules/user/user.types';

export type RequestWithUser = FastifyRequest & {
  user: UserDb;
};
