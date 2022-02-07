import request from 'supertest';
import { app } from '../src/main';
import { loginUser } from './auth.test';
import { API_URL, BUYER_AUTH, SELLER_AUTH } from './global-const';
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

describe('Deposit vending machine', () => {
  it('Seller should not be allowed to deposit', async () => {
    const res = await request(app)
      .post(`${API_URL}/users/deposit`)
      .set({ Authorization: `Bearer ${auth.sellerToken}` })
      .send({
        amount: 100,
      });

    expect(res.statusCode).toEqual(401);
  });

  it('Deposit value cannot be negative', async () => {
    const res = await request(app)
      .post(`${API_URL}/users/deposit`)
      .set({ Authorization: `Bearer ${auth.buyerToken}` })
      .send({
        amount: -100,
      });

    expect(res.statusCode).toEqual(400);
  });

  it('Deposit value must be a number', async () => {
    const res = await request(app)
      .post(`${API_URL}/users/deposit`)
      .set({ Authorization: `Bearer ${auth.buyerToken}` })
      .send({
        amount: 'invalid value',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('Deposit increases balance accordingly', async () => {
    const userRes = await request(app)
      .get(`${API_URL}/users/deposit`)
      .set({ Authorization: `Bearer ${auth.buyerToken}` });

    const amountBeforeDeposit = userRes.body.deposit;

    const res = await request(app)
      .post(`${API_URL}/users/deposit`)
      .set({ Authorization: `Bearer ${auth.buyerToken}` })
      .send({
        amount: 100,
      });

    const userPostRes = await request(app)
      .get(`${API_URL}/users/deposit`)
      .set({ Authorization: `Bearer ${auth.buyerToken}` });

    const amountAfterDeposit = userPostRes.body.deposit;

    expect(res.statusCode).toEqual(200);
    expect(amountAfterDeposit).toEqual(amountBeforeDeposit + 100);
  });

  it('Deposit of invalid coin value is not allowed', async () => {
    const res = await request(app)
      .post(`${API_URL}/users/deposit`)
      .set({ Authorization: `Bearer ${auth.buyerToken}` })
      .send({
        amount: 18,
      });

    expect(res.statusCode).toEqual(400);
  });

  it('Deposit of valid coin value is allowed', async () => {
    const res = await request(app)
      .post(`${API_URL}/users/deposit`)
      .set({ Authorization: `Bearer ${auth.buyerToken}` })
      .send({
        amount: 50,
      });

    expect(res.statusCode).toEqual(200);
  });
});

describe('Reset deposit', () => {
  it('Buyer balance should be 0 after reset', async () => {
    const res = await request(app)
      .post(`${API_URL}/users/deposit/reset`)
      .set({ Authorization: `Bearer ${auth.buyerToken}` })
      .send({});

    const userPostRes = await request(app)
      .get(`${API_URL}/users/deposit`)
      .set({ Authorization: `Bearer ${auth.buyerToken}` });

    const amountAfterReset = userPostRes.body.deposit;

    expect(res.statusCode).toEqual(200);
    expect(amountAfterReset).toEqual(0);
  });
});
