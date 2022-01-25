export type ILoginRequest = {
  username: string;
  password: string;
};

export type AuthTokenData = {
  id: string;
  username: string;
  role: string;
};

export type ILoginResponse = {
  token: string;
};

export type IRegisterRequest = {
  username: string;
  password: string;
  role: string;
};

export type IRegisterResponse = ILoginResponse;

export enum UserRoles {
  ADMIN = 'admin', // allows registering seller accounts
  BUYER = 'buyer', // allow deposit and buying products
  SELLER = 'seller', // allows creting/updating/deleting their own products
}
