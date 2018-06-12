const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Product routes', async () => {
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
    it('retrieves a proper and correct name for a created product', async () => {
      const res = await request(app).get('/api/products');
      expect(res.body[0].name).to.equal('The Death Star');
    });
    it('lets you post a thing', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({
          name: 'Enterprise-D'
        });
      expect(res.body.name).to.equal('Enterprise-D');
      const { body } = await request(app).get('/api/products');
      expect(body.length).to.equal(2);
    });
    it('lets you put a thing with a returning put route', async () => {
      const res = await request(app)
        .put('/api/products/1')
        .send({ price: 9999 });
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('The Death Star');
      expect(res.body.price).to.equal(`9999`);
    });
    it('lets you delete a thing with a delete route', async () => {
      await request(app).delete('/api/products/1');
      const res = await request(app).get('/api/products');
      expect(res.status).to.equal(200);
    });
  });
});
