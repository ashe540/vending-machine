import supertest from 'supertest';
import { app } from '../src/main';
import { demoCreateProduct, demoProduct } from './global-const';

const requestWithSupertest = supertest(app);

const API_URL = '/api/v1';
const BUYER_AUTH = 'buyer';
const SELLER_AUTH = 'seller';

const auth: any = {
  buyerToken: '',
  sellerToken: '',
};
let productId;

beforeAll(loginUser);

describe('Product endpoints', () => {
  it('GET /products should show all products', async () => {
    const res = await requestWithSupertest.get(`${API_URL}/products`);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
  });

  it('POST /products should require authentication', async () => {
    const res = await requestWithSupertest
      .post(`${API_URL}/products`)
      .send(demoProduct);

    expect(res.statusCode).toEqual(401);
  });

  it('POST /products should create a new product', async () => {
    const res = await requestWithSupertest
      .post(`${API_URL}/products`)
      .set({ Authorization: `Bearer ${auth.sellerToken}` })
      .send(demoCreateProduct);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');

    productId = res.body.id;
  });

  it('DELETE /products/:id should require authentication', async () => {
    const res = await requestWithSupertest.delete(
      `${API_URL}/products/${productId}`
    );

    expect(res.statusCode).toEqual(401);
  });

  it('DELETE /products/:id should delete the product', async () => {
    const res = await requestWithSupertest
      .delete(`${API_URL}/products/${productId}`)
      .set({ Authorization: `Bearer ${auth.sellerToken}` });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});

// afterAll(async () => {
// await requestWithSupertest.post(`${API_URL}/products`)
// })

async function loginUser(): Promise<void> {
  const buyerAuth = await requestWithSupertest
    .post(`${API_URL}/users/login`)
    .send({
      username: BUYER_AUTH,
      password: BUYER_AUTH,
    });

  expect(buyerAuth.status).toEqual(200);
  expect(buyerAuth.type).toEqual(expect.stringContaining('json'));
  expect(buyerAuth.body).toHaveProperty('token');

  const sellerAuth = await requestWithSupertest
    .post(`${API_URL}/users/login`)
    .send({
      username: SELLER_AUTH,
      password: SELLER_AUTH,
    });

  expect(sellerAuth.status).toEqual(200);
  expect(sellerAuth.type).toEqual(expect.stringContaining('json'));
  expect(sellerAuth.body).toHaveProperty('token');

  auth.buyerToken = buyerAuth.body.token;
  auth.sellerToken = sellerAuth.body.token;
}
