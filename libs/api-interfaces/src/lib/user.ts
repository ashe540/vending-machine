export type IUser = {
  _id?: string;
  id?: string;
  username: string;
  password: string;
  deposit: number;
  role: string;
};

export type IAuthUserBasic = {
  username: string;
  deposit: number;
};
