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
        await picard.update({ password: 1701 });
      } catch (e) {
        catcher = 1;
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
      let jimmy = '';
      try {
        await picard.update({ address: ["Wesley's quarters"] });
      } catch (e) {
        jimmy = 'jimmeh';
      }
      expect(!jimmy).to.be.false;
    });
    it('has an admin field, requiring a boolean, set to false by default', async () => {
      let testErr = false;
      expect(picard.isAdmin).to.be.false;
      try {
        await picard.update({ isAdmin: '2true' }); //n.b. 'true' coerces to true... heh
      } catch (e) {
        testErr = true;
      }
      expect(testErr).to.be.true;
      await picard.update({ isAdmin: true });
      expect(picard.isAdmin).to.be.true;
    });
    it('has a user cart on initialization', () =>
      expect(picard.cart).to.be.truthy);
    it('that cart is initialized as an empty array', () =>
      expect(picard.cart).to.deep.equal([]));
    it('can accept JSON as its elements', async () => {
      let testVal = true;
      try {
        await picard.update({
          cart: ['I am Locutus of Borg', 'Resistance is futile']
        });
      } catch (e) {
        console.log('successful error');
        testVal = false;
      }
      expect(testVal).to.be.true;
      expect(typeof picard.cart[0]).to.equal('string');

      try {
        await picard.update({
          cart: [{ object: 'You will respond to my questions', prop: 'boop' }]
        });
        testVal = false;
      } catch (e) {
        testVal = true;
      }
      expect(testVal).to.be.false;
      expect(picard.cart).to.deep.equal([
        { object: 'You will respond to my questions', prop: 'boop' }
      ]);
    });
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
