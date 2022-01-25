import bcrypt from "bcrypt";
import { Schema, Document, Model, model } from "mongoose";
import { IUser } from "@vending-machine/api-interfaces";

export type AuthUserDocument = IUser & Document;

interface InstanceMethods {
  validPassword: (password: string) => Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const UserSchema = new Schema<AuthUserDocument, {}, InstanceMethods>({
  username: { type: String },
  password: { type: String },
  deposit: { type: Number, default: 0 },
  role: { type: String, enum: ["admin", "buyer", "seller"], default: "buyer" },
});

export interface IUserModel
  // eslint-disable-next-line @typescript-eslint/ban-types
  extends Model<AuthUserDocument, {}, InstanceMethods> {
  validPassword(password: string): Promise<boolean>;
  toObject(): IUser;
}

UserSchema.methods.validPassword = function (
  this: IUser,
  password
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Document middlewares
UserSchema.pre<AuthUserDocument>("save", function (this: AuthUserDocument) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

export const UserModel = model<AuthUserDocument, IUserModel>(
  "User",
  UserSchema
);
