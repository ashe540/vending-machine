import ProductRepo from "./productRepository";
import UserRepo from "./userRepository";
import PurchaseRepo from "./purchaseRepository";

import { ProductModel } from "../infra/mongoose/models/product";
import { PurchaseModel } from "../infra/mongoose/models/purchase";
import { UserModel } from "../infra/mongoose/models/user";

export const ProductRepository = new ProductRepo(ProductModel);
export const PurchaseRepository = new PurchaseRepo(PurchaseModel);
export const UserRepository = new UserRepo(UserModel);
