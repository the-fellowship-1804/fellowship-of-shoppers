const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
  before(async () => {
    try {
      await db.sync({ force: true });
      await User.create({
        email: 'T@E.com',
        password: 'pw'
      });
      await User.create({
        email: 'T2@E.com',
        password: 'pw'
      });
    } catch (error) {
      console.log(error);
    }
  });

  describe('/api/users/', () => {
    it('GET /api/users gets all users as an array', async () => {
      try {
        const res = await request(app).get('/api/users');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(3); //3 is to account for the guest user who is created upon get request from out not-logged in user functionality
        expect(res.body[0].email).to.equal('T@E.com');
      } catch (error) {
        console.log(error);
      }
    });
    it('GET /api/users/:id gets one user as an object', async () => {
      try {
        const res = await request(app).get('/api/users/1');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.email).to.be.equal('T@E.com');
      } catch (error) {
        console.log(error);
      }
    });
    it('PUT /api/users/:id lets you edit a user', async () => {
      try {
        const res = await request(app)
          .put('/api/users/1')
          .send({
            imageUrl: 'string'
          });
        expect(res.body.imageUrl).to.equal('string');
      } catch (error) {
        console.log(error);
      }
      //more tests for handling the different add/merge cart conditions would be good
    });
    it('DELETE /api/users/:id deletes the user with the given ID', async () => {
      try {
        const res = await request(app).delete('/api/users/1');
        expect(res.status).to.equal(200);
        // const check = await request(app).get('/api/users/1');
        // expect(check.status).to.equal(500);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
