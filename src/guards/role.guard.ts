import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser, Roles } from '../app.types';
import { Role } from '../decorators/role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<Roles>(Role, context.getHandler());
    if (!role) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (role === Roles.admin && user.role !== Roles.admin) {
      throw new ForbiddenException("You don't have permission");
    }

    return true;
  }
}
