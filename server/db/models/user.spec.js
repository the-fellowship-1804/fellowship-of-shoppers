const { expect } = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
  describe('Basic functionality for the User model', () => {
    it('The model exists', () => expect(User).not.to.be.an('undefined'));
  });
  describe('Each desired column exists', () => {
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
    });
    it('has an email field', () => expect(TU.email).not.to.be.an('undefined'));
    it('has a password field', () =>
      expect(TU.password).not.to.be.an('undefined'));
    it('has a salt field', () => expect(TU.salt).not.to.be.an('undefined'));
    it('has a googleId field', () =>
      expect(TU.googleId).not.to.be.an('undefined'));
    it('has an address field', () =>
      expect(TU.address).not.to.be.an('undefined'));
    it('has a cart field', () => expect(TU.cart).not.to.be.an('undefined'));
    it('has an orderHistory field', () =>
      expect(TU.orderHistory).not.to.be.an('undefined'));
    it('has an isAdmin field', () =>
      expect(TU.isAdmin).not.to.be.an('undefined'));
    it('has an imageUrl field', () =>
      expect(TU.imageUrl).not.to.be.an('undefined'));
  });
  describe('Each column accepts only the correct data types and validates them', () => {
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
    });

    it('"email" column accepts only strings', async () => {
      let testVal;
      try {
        await TU.update({ email: [] });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });
    it('"email" column is required', async () => {
      let testVal;
      try {
        await User.create();
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.a('error');
    });
    // it('"email" column rejects non-email strings', async () => { UNCOMMENT THIS WHEN WE HAVE EMAIL VALIDATION, IF WE EVER DO
    //   let testVal;
    //   try {
    //     await TU.update({email = 'not an email'});
    //   } catch (error) {
    //     testVal = error;
    //   }
    //   expect(testVal).to.be.an('error');
    // });
    it('"email" column rejects duplicate emails', async () => {
      let testVal;
      try {
        await User.create({ email: 'T@E.com' });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it('"password" column accepts only strings', async () => {
      let testVal;
      try {
        await TU.update({ password: [] });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });
    it('"password" column\'s contents are hidden in a function', () => {
      expect(TU.password).to.be.a('function');
    });

    it('"salt" column is a string', () => {
      expect(TU.salt()).to.be.a('string'); //cannot use equal to because of random generation
    });
    it('"salt" column\'s contents are hidden in a function', () => {
      expect(TU.salt).to.be.a('function');
    });

    // it('"googleId" column is a string', () => {
    //   expect(TU.googleId.to.be.a('string'))//will fail because null unless you use oauth
    // });//but I do not know how to test oauth
    // //Also test that it is given to you by google on successful OAuth

    it('"address" column accepts only strings', async () => {
      let testVal;
      try {
        await TU.update({ address: [] });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it('"cart" column accepts only arrays', async () => {
      let testVal;
      try {
        await TU.update({ cart: 'string' });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });
    // it('"cart" column arrays only accept JSON', async () => {
    //  //I do not know how to test this. Passing in non-JSON data never fails
    //  //Maybe Sequelize.ARRAY(Sequelize.JSON) does not actually prevent non-JSON data from being added?
    // });
    it('"cart" column initializes as an empty array', async () => {
      try {
        await db.sync({ force: true });
        TU = await User.create({
          email: 'T@E.com',
          password: 'pw'
        });
      } catch (error) {
        console.log(error);
      }
      expect(TU.cart).to.deep.equal([]);
    });

    // it('"orderHistory" column can accept an array of arrays of objects', async () => {
    //   //I do not know how to test this. Passing in non-JSON data always fails, even though it works in the frontent
    //   //I suspect it has something to do with the getter and setter functions
    // });

    it('"isAdmin" column is a boolean', () => {
      expect(TU.isAdmin).to.be.a('boolean');
    });
    it('"isAdmin" column defaults to false', () => {
      expect(TU.isAdmin).to.equal(false);
    });

    it('"imageUrl" column accepts only strings', async () => {
      let testVal;
      try {
        await TU.update({ imageUrl: [] });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });
  });
});

describe('Class methods', () => {
  let TU;
  before(async () => {
    await db.sync({ force: true });
    TU = await User.create({
      email: 'T@E.com',
      password: 'pw'
    });
  });

  describe('password', () => {
    it('"password" column is encrypted with randomized salting and hashing', async () => {
      let first;
      let second;
      try {
        first = await User.create({
          email: 'first@e.com',
          password: 'pw'
        });
        second = await User.create({
          email: 'second@e.com',
          password: 'pw'
        });
      } catch (error) {
        console.log(error);
      }
      expect(first.password()).not.to.equal(second.password());
    });
    it('"password" column is re-encrypted on update', async () => {
      const oldPassword = TU.password();
      try {
        await TU.update({ password: 'newpw' });
      } catch (error) {
        console.log(error);
      }
      expect(TU.password()).not.to.equal(oldPassword);
    });
  });

  describe('salt', () => {
    it('"salt" column is randomly generated on account creation', async () => {
      let first;
      let second;
      try {
        first = await User.create({
          email: 'third@e.com',
          password: 'pw'
        });
        second = await User.create({
          email: 'fourth@e.com',
          password: 'pw'
        });
      } catch (error) {
        console.log(error);
      }
      expect(first.salt()).not.to.equal(second.salt());
    });
    it('"salt" column is randomly regenerated on password update', async () => {
      const oldSalt = TU.salt();
      try {
        await TU.update({ password: 'newpw' });
      } catch (error) {
        console.log(error);
      }
      expect(TU.salt()).not.to.equal(oldSalt);
    });
  });

  describe('Instance methods', () => {
    describe('correctPassword', () => {
      it('returns true if the password is correct', () => {
        expect(TU.correctPassword('newpw')).to.be.equal(true);
      });
      it('returns false if the password is incorrect', () => {
        expect(TU.correctPassword('wrongpw')).to.be.equal(false);
      });
    });
  });
});
