import request from 'supertest';
import { app } from '../src/main';
import { loginUser } from './auth.test';
import { API_URL, BUYER_AUTH, demoProduct, SELLER_AUTH } from './global-const';
import { AuthTest } from './interfaces';

const auth: AuthTest = {
  buyerToken: '',
  sellerToken: '',
};

beforeAll(async () => {
  const buyerAuth = await loginUser(API_URL, {
    username: BUYER_AUTH,
    password: BUYER_AUTH,
  });
  const sellerAuth = await loginUser(API_URL, {
    username: SELLER_AUTH,
    password: SELLER_AUTH,
  });

  auth.buyerToken = buyerAuth.body.token;
  auth.sellerToken = sellerAuth.body.token;
});

describe('Buy from vending machine', () => {
  it('Product must exist', async () => {
    const res = await request(app).get(
      `${API_URL}/products/${demoProduct._id}`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('cost');
    expect(res.body.cost).toEqual(0.5);
  });

  it('Seller should not be allowed to buy a product', async () => {
    const res = await request(app)
      .post(`${API_URL}/products/${demoProduct._id}/buy`)
      .set({ Authorization: `Bearer ${auth.sellerToken}` })
      .send({
        quantity: 1,
      });

    expect(res.statusCode).toEqual(401);
  });

  it('Buyer should be allowed to buy when enough tokens', async () => {
    const resDeposit = await request(app)
      .post(`${API_URL}/users/deposit`)
      .set({ Authorization: `Bearer ${auth.buyerToken}` })
      .send({
        amount: 100,
      });

    const res = await request(app)
      .post(`${API_URL}/products/${demoProduct._id}/buy`)
      .set({ Authorization: `Bearer ${auth.buyerToken}` })
      .send({
        quantity: 1,
      });

    expect(resDeposit.statusCode).toEqual(200);
    expect(res.statusCode).toEqual(200);
  });

  it('Buyer should not be allowed to buy when not enough tokens', async () => {
    const resDepositReset = await request(app)
      .post(`${API_URL}/users/deposit/reset`)
      .set({ Authorization: `Bearer ${auth.buyerToken}` })
      .send({});

    const res = await request(app)
      .post(`${API_URL}/products/${demoProduct._id}/buy`)
      .set({ Authorization: `Bearer ${auth.buyerToken}` })
      .send({
        quantity: 1,
      });

    expect(resDepositReset.statusCode).toEqual(200);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});
