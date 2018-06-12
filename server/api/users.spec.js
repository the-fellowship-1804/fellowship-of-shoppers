const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
  let TU;
  before(async () => {
    try {
      await db.sync({ force: true });
      TU = await User.create({
        email: 'T@E.com',
        password: 'pw'
      });
    } catch (error) {
      console.log(error);
    }

    describe('/api/users/', () => {
      it('GET /api/users gets all users as an array', () => {
        return request(app)
          .get('/api/users')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body[0].email).to.be.equal('T@E.com');
          });
      });
      it('GET /api/users/:id gets one user as an object', () => {
        return request(app)
          .get('/api/users/1')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object');
            expect(res.body[0].email).to.be.equal('T@E.com');
          });
      });
    });
  });
});
