import { User } from "../entities/User";
import { IUser } from "@vending-machine/api-interfaces";
import { IUserModel } from "../infra/mongoose/models/user";
import { MongoRepository } from "./base/MongoRepository";

export interface IUserRepository extends MongoRepository<IUserModel, IUser> {
  register(user: User): void;
  findByUsername(
    username: string,
    password: string
  ): Promise<IUserModel | IUser | null>;
  deposit(userId: string, amount: number): Promise<boolean>;
}

export default class UserRepository
  extends MongoRepository<IUserModel, IUser>
  implements IUserRepository
{
  constructor(model: IUserModel) {
    super(model);
  }

  findByUsername(username: string): Promise<IUserModel | IUser | null> {
    return this.findOne({ username });
  }

  register(user: User): Promise<IUserModel> {
    return this.create(user);
  }

  deposit(userId: string, amount: number): Promise<boolean> {
    return this.update(userId, {
      amountAvailable: { $inc: amount },
    });
  }
}
