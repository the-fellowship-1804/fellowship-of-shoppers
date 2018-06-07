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
    it('has an email field', () => expect(!!picard.email).to.be.true);
    it('has a validated email field', async () => {
      expect(typeof picard.email).to.equal('string');
      let errorFound;
      try {
        await picard.update({ email: { email: 'yo' } });
      } catch (err) {
        errorFound = true;
      }
      expect(errorFound).to.be.true;
      // expect(await picard.setEmail('failformat@forgotthedot')).to.error;
    });
    it('has a password field which must be a string', async () => {
      expect(!!picard.password).to.be.true;
      let catcher = null;
      try {
        // console.log(catcher);
        await picard.update({ password: 1701 });
      } catch (e) {
        // console.log(catcher);
        catcher = 1;
        // console.log(catcher);
      }
      expect(catcher);
      try {
        await picard.update({ password: `1701` });
        catcher = 0;
      } catch (e) {
        catcher = 1;
      }
      expect(!catcher);
    });
    it('has an address field', async () => {
      await picard.update({ address: 'Risa' });
      expect(picard.address).to.equal('Risa');
    });
    it('has this address field require type "string"', async () => {
      expect(await picard.update({ address: ["Wesley's quarters"] })).to
        .eventually.be.rejected;
    });
    it('has an admin field, requiring a boolean, set to false by default', async () => {
      expect(picard.isAdmin).to.be.false;
      expect(await picard.update({ isAdmin: 'true' })).to.error;
      await picard.setIsAdmin(true);
      expect(picard.isAdmin).to.be.true;
    }); //end describe basic functionailty
  }),
    describe('instanceMethods', () => {
      describe('correctPassword', () => {
        let cody;
        // beforeEach(() => {
        //   return User.create({
        //     email: 'cody@puppybook.com',
        //     password: 'bones',
        //   }).then(user => {
        //     cody = user;
        //   });
        // });
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
