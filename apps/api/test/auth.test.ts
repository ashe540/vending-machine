import request from 'supertest';
import { app } from '../src/main';
import { API_URL, BUYER_AUTH, SELLER_AUTH } from './global-const';

export async function loginUser(apiUrl, { username, password }): Promise<any> {
  const auth = await request(app).post(`${apiUrl}/users/login`).send({
    username: username,
    password: password,
  });

  return auth;
}

describe.skip('Authentication - Buyer', () => {
  it('Login buyer should return token', async () => {
    const buyerAuth = await loginUser(API_URL, {
      username: BUYER_AUTH,
      password: BUYER_AUTH,
    });
    expect(buyerAuth.status).toEqual(200);
    expect(buyerAuth.type).toEqual(expect.stringContaining('json'));
    expect(buyerAuth.body).toHaveProperty('token');
  });
});

describe.skip('Authentication - Seller', () => {
  it('Login seller should return token', async () => {
    const sellerAuth = await loginUser(API_URL, {
      username: SELLER_AUTH,
      password: SELLER_AUTH,
    });

    expect(sellerAuth.status).toEqual(200);
    expect(sellerAuth.type).toEqual(expect.stringContaining('json'));
    expect(sellerAuth.body).toHaveProperty('token');
  });
});
