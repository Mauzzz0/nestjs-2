import { Roles } from '../../app.types';

export type SaveNewUser = {
  name: string;
  email: string;
  password: string;
};

export type UserDb = SaveNewUser & {
  role: Roles;
  created_at: string;
  updated_at: string;
};
