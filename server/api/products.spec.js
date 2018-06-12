const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('products', async () => {
    beforeEach(async () => {
      await Product.create({
        name: 'The Death Star'
      });
    });
    it('gets a 200-OK response', async () => {
      const res = await request(app).get('/api/products');
      expect(res.status).to.equal(200);
    });
  });
});
