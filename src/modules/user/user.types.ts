import { Roles } from '../../app.types';

export type UserDb = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Roles;
  created_at: string;
  updated_at: string;
};
