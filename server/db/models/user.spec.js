/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
  let picard;
  beforeEach(() => {
    return db.sync({ force: true });
  });
  beforeEach(async () => {
    picard = await User.create({
      email: 'jim@kirk.ship',
      password: 'bonesmccoy'
    });
  });
  describe('basic functionality', () => {
    it('the model exists', () => expect(!!picard).to.be.true);

    //end describe basic functionailty
  }),
    describe('instanceMethods', () => {
      describe('correctPassword', () => {
        let cody;
        beforeEach(async () => {
          cody = await User.create({
            email: 'cody@puppybook.com',
            password: 'bones'
          });
        });

        it('returns true if the password is correct', () => {
          expect(cody.correctPassword('bones')).to.be.equal(true);
        });

        it('returns false if the password is incorrect', () => {
          expect(cody.correctPassword('bonez')).to.be.equal(false);
        });
      }); // end describe('correctPassword')
    }); // end describe('instanceMethods')
}); // end describe('User model')
