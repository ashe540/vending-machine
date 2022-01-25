import Boom from '@hapi/boom';
import { RequestHandler } from 'express';
import { Purchase } from '../../entities/Purchase';
import {
  ProductRepository,
  PurchaseRepository,
  UserRepository,
} from '../../repositories';
import {
  IPurchaseProduct,
  IPurchaseResult,
} from '@vending-machine/api-interfaces';

export const buy: RequestHandler = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const { quantity = 1 } = req.body;

  const productModel = await ProductRepository.findById(id);

  // Middleware ensures that product exists
  const product = productModel.toObject();

  const totalCost = quantity * product.cost;

  const productPurchased: IPurchaseProduct = {
    productId: id,
    productName: product.name,
    quantity,
    cost: product.cost,
  };

  const purchase = new Purchase(
    [productPurchased],
    totalCost,
    user.id,
    new Date()
  );

  // Step 1: Check account balance to confirm whether we can proceed
  const userModel = await UserRepository.findById(user.id);
  const userObj = userModel!.toObject();

  const availableBalance = userObj.deposit / 100; // deposit is in cents

  if (availableBalance < totalCost) {
    const pendingBalance =
      Math.round((totalCost - availableBalance) * 100) / 100;
    return res.json({
      message: `You do not have enough balance to make the purchase. Please deposit ${pendingBalance} to your account and try again`,
    });
  }

  try {
    // Step 2: Deduct amount from account balance
    await UserRepository.update(user.id, {
      $inc: { deposit: -(totalCost * 100) },
    });

    // Step 3: Create purchase (if purchase fails we need to credit their account with deducted amount)
    await PurchaseRepository.createPurchase(purchase);
  } catch (e) {
    // Perform rollback - credit the amount back into account
    await UserRepository.update(user.id, {
      $inc: { deposit: totalCost * 100 },
    });
  }

  // Step 4: Calculate change
  const changeList = calculateChange(userObj.deposit - totalCost * 100);

  const result: IPurchaseResult = {
    totalSpent: totalCost,
    purchasedProducts: [productPurchased],
    change: changeList,
  };

  res.json(result);
};

export const buyMultiple: RequestHandler = async (req, res) => {
  const { user } = req;
  const { products } = req.body;

  const productIds = products.map((p) => p.id);
  const uniqProductIds = [...new Set(productIds)];

  const productModels = await ProductRepository.findByIds(productIds);

  // Check if all products have been fetched, otherwise we cannot continue
  if (productModels.length != uniqProductIds.length) {
    throw Boom.badRequest('Invalid product ID was provided');
  }

  const productObjs = productModels.map((p) => p.toObject());

  const productsWithPrice = products
    .map((p) => {
      const foundProduct = productObjs.find((el) => el._id.toString() === p.id);

      if (foundProduct) {
        return {
          ...p,
          cost: foundProduct.cost,
        };
      }

      return null;
    })
    .filter((el) => !!el);

  // TODO: Think about potentially combining same products that have been separated into a single line item

  const totalCost = productsWithPrice.reduce(
    (prev, curr) => {
      return { total: prev.total + curr.quantity * curr.cost };
    },
    { total: 0 }
  ).total;

  const purchase = new Purchase(products, totalCost, user.id, new Date());

  // Step 1: Check account balance to confirm whether we can proceed
  const userModel = await UserRepository.findById(user.id);
  const userObj = userModel!.toObject();

  const availableBalance = userObj.deposit;

  if (availableBalance < totalCost) {
    throw Boom.notAcceptable(
      `You do not have enough balance to make the purchase. Please deposit ${
        totalCost - availableBalance
      } cents to your account and try again`
    );
  }

  try {
    // Step 2: Deduct amount from account balance
    await UserRepository.update(user.id, { $inc: { deposit: -totalCost } });

    // Step 3: Create purchase (if purchase fails we need to credit their account with deducted amount)
    await PurchaseRepository.createPurchase(purchase);
  } catch (e) {
    // Perform rollback - credit the amount back into account
    await UserRepository.update(user.id, { $inc: { deposit: totalCost } });
  }

  // Step 4: Calculate change
  const changeList = calculateChange(availableBalance - totalCost);

  const result: IPurchaseResult = {
    totalSpent: totalCost,
    purchasedProducts: products,
    change: changeList,
  };

  res.json(result);
};

function calculateChange(amount): Array<number> {
  const allowedCoins = [5, 10, 20, 50, 100];
  const sortedAllowedCoins = allowedCoins.sort((a, b) => b - a);

  const numberOfAllowedCoins: number[] = [];
  let total = amount;

  sortedAllowedCoins.forEach((value) => {
    const numCoins = Math.floor(total / value);
    numberOfAllowedCoins.push(numCoins);
    total = total % value;
  });

  return numberOfAllowedCoins;
}
