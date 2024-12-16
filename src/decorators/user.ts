import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../app.types';
import { UserDb } from '../modules/user/user.types';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): UserDb => {
  const request = ctx.switchToHttp().getRequest<RequestWithUser>();

  return request.user;
});
