import { IUser } from "@vending-machine/api-interfaces";

export class User {
  private _id: string;
  private _username: string;
  private _password: string;
  private _deposit: number;
  private _role: string;

  constructor(
    id: string,
    username: string,
    password: string,
    deposit: number,
    role: string
  ) {
    this._id = id;
    this._username = username;
    this._password = password;
    this._deposit = deposit;
    this._role = role;
  }

  static fromUser(user: IUser) {
    return new User(
      user._id!,
      user.username,
      user.password,
      user.deposit,
      user.role
    );
  }

  get id(): string {
    return this._id;
  }
  get username(): string {
    return this._username;
  }
  get deposit(): number {
    return this._deposit;
  }
  get role(): string {
    return this._role;
  }
}
