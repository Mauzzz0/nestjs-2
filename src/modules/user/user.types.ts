export type SaveNewUser = {
  name: string;
  email: string;
  password: string;
};

export type UserDb = SaveNewUser & {
  created_at: string;
  updated_at: string;
};
