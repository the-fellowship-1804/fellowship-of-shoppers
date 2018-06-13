const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');
import supertest from 'supertest';
import chai from 'chai';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);

describe('Product routes', () => {
  beforeEach('Sync and clear database', () => db.sync({ force: true }));

  after('Synchronize and clear database', () => db.sync({ force: true }));

  describe('Server', () => {
    let agent;
    beforeEach('Set up agent for testing', () => {
      agent = supertest(app);
    });

    describe('api routes', () => {
      let deathStar;
      let xwing;
      beforeEach('Seed products', () => {
        const products = [
          { name: 'X-Wing', firepower: 120 },
          { name: 'The Death Star', firepower: 50000 }
        ];
        return Product.bulkCreate(products, { returning: true }).then(
          createdProducts => {
            xwing = createdProducts[0].id;
            deathStar = createdProducts[1].id;
          }
        );
      });

      describe('products', () => {
        it('serves up all products on request to GET /', () => {
          return agent
            .get(`/api/products`)
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an('array');
              expect(res.body.length).to.be.equal(2);
              expect(res.body).to.contain.a.thing.with('id', xwing);
              expect(res.body).to.contain.a.thing.with('id', deathStar);
            });
        });

        it('serves a single product on a GET to /:productid', () => {
          return agent
            .get(`/api/products/${xwing}`)
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include({ name: 'X-Wing', firepower: 120 });
            });
        });
      });
    });
  });
});

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
