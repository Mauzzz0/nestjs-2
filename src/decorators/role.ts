import { Reflector } from '@nestjs/core';
import { Roles } from '../app.types';

export const Role = Reflector.createDecorator<Roles>();
