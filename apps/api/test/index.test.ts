import request from 'supertest';
import { app } from '../src/main';
import { loginUser } from './auth.test';
import {
  API_URL,
  BUYER_AUTH,
  demoCreateProduct,
  demoProduct,
  SELLER_AUTH,
} from './global-const';
import { AuthTest } from './interfaces';

const auth: AuthTest = {
  buyerToken: '',
  sellerToken: '',
};
let productId;

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

describe.skip('Product endpoints', () => {
  it('GET /products should show all products', async () => {
    const res = await request(app).get(`${API_URL}/products`);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
  });

  it('POST /products should require authentication', async () => {
    const res = await request(app)
      .post(`${API_URL}/products`)
      .send(demoProduct);

    expect(res.statusCode).toEqual(401);
  });

  it('POST /products should create a new product', async () => {
    const res = await request(app)
      .post(`${API_URL}/products`)
      .set({ Authorization: `Bearer ${auth.sellerToken}` })
      .send(demoCreateProduct);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');

    productId = res.body.id;
  });

  it('DELETE /products/:id should require authentication', async () => {
    const res = await request(app).delete(`${API_URL}/products/${productId}`);

    expect(res.statusCode).toEqual(401);
  });

  it('DELETE /products/:id should delete the product', async () => {
    const res = await request(app)
      .delete(`${API_URL}/products/${productId}`)
      .set({ Authorization: `Bearer ${auth.sellerToken}` });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});
