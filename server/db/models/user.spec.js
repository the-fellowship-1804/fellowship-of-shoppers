const { expect, assert } = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
  let TU;
  before(async () => {
    await db.sync({ force: true });
  });
  before(async () => {
    TU = await User.create({ email: 'test@email.com' });
  });

  describe('Basic functionality for the User model', () => {
    it('The model exists', () => assert.isDefined(TU));
    describe('Each desired column exists', () => {
      it('has an email field', () => assert.isDefined(TU.email));
      it('has a password field', () => assert.isDefined(TU.password));
      it('has a salt field', () => assert.isDefined(TU.salt));
      it('has a googleId field', () => assert.isDefined(TU.googleId));
      it('has an address field', () => assert.isDefined(TU.address));
      it('has a cart field', () => assert.isDefined(TU.cart));
      it('has an orderHistory field', () => assert.isDefined(TU.orderHistory));
      it('has an isAdmin field', () => assert.isDefined(TU.isAdmin));
      it('has an imageUrl field', () => assert.isDefined(TU.imageUrl));
    });
    describe('Each column accepts only the correct data types and validates them', () => {
      const updateObj = {};
      beforeEach(() => {
        updateObj.email = 'test@email.com';
        updateObj.password = 'string';
        updateObj.address = 'string';
        updateObj.imageUrl = 'string';
      });

      it('"email" column accepts only strings', async () => {
        let testVal;
        try {
          updateObj.email = [];
          await TU.update(updateObj);
        } catch (error) {
          testVal = error.message;
        }
        expect(testVal).to.equal(
          'string violation: email cannot be an array or an object'
        );
      });
      it('"email" column is required', async () => {
        let testVal;
        try {
          await User.create();
        } catch (error) {
          testVal = error.message;
        }
        expect(testVal).to.equal(
          'notNull Violation: user.email cannot be null'
        );
      });
      // it('"email" column rejects non-email strings', async () => { UNCOMMENT THIS WHEN WE HAVE EMAIL VALIDATION, IF WE EVER DO
      //   let testVal;
      //   try {
      //     updateObj.email = 'not an email';
      //     await TU.update(updateObj);
      //   } catch (error) {
      //     testVal = error.message;
      //   }
      //   expect(testVal).to.equal(
      //     'THE ERROR MESSAGE YOU GET IF YOU ENTER A NOT-EMAIL'
      //   );
      // });
      it('"email" column rejects duplicate emails', async () => {
        let testVal;
        try {
          await User.create({ email: 'test@email.com' });
        } catch (error) {
          testVal = error.message;
        }
        expect(testVal).to.equal('Validation error');
      });

      it('"password" column accepts only strings', async () => {
        let testVal;
        try {
          updateObj.password = [];
          await TU.update(updateObj);
        } catch (error) {
          testVal = error.message;
        }
        expect(testVal).to.equal(
          'string violation: password cannot be an array or an object'
        );
      });
      it('"password" column\'s contents are hidden in a function', () => {
        assert.isFunction(TU.password);
      });

      //this doesn't work, always returning null. I think it's because of the getter
      // it('"salt" column is a string', () => {
      //   expect(TU.salt()).to.be.a('string'); //cannot use equal to because of random generation
      // });
      it('"salt" column\'s contents are hidden in a function', () => {
        assert.isFunction(TU.salt);
      });

      // it('"googleId" column is a string', () => {
      //   expect(TU.googleId.to.be.a('string'))//will fail because null unless you use oauth
      // });//but I do not know how to test oauth
      // //Also test that it is given to you by google on successful OAuth

      it('"address" column accepts only strings', async () => {
        let testVal;
        try {
          updateObj.address = [];
          await TU.update(updateObj);
        } catch (error) {
          testVal = error.message;
        }
        expect(testVal).to.equal(
          'string violation: address cannot be an array or an object'
        );
      });

      it('"cart" column accepts only arrays', async () => {
        let testVal;
        try {
          updateObj.cart = 'string';
          await TU.update(updateObj);
        } catch (error) {
          testVal = error.message;
        }
        expect(testVal).to.equal('values.map is not a function');
      });
      // it('"cart" column arrays only accept JSON', async () => {
      //  //I do not know how to test this. Passing in non-JSON data never fails
      //  //Maybe Sequelize.ARRAY(Sequelize.JSON) does not actually prevent non-JSON data from being added?
      // });
      it('"cart" column initializes as an empty array', async () => {
        try {
          const TTU = await User.create({ email: 'T@E.com' });
          expect(TTU.cart).to.deep.equal([]);
        } catch (error) {
          console.log(error);
        }
      });

      // it('"orderHistory" column can accept an array of arrays of objects', async () => {
      //   //I do not know how to test this. Passing in non-JSON data always fails, even though it works in the frontent
      //   //I suspect it has something to do with the getter and setter functions
      // });

      it('"isAdmin" column is a boolean', async () => {
        expect(TU.isAdmin).to.be.a('boolean');
      });
      it('"isAdmin" column defaults to false', async () => {
        expect(TU.isAdmin).to.equal(false);
      });

      it('"imageUrl" column accepts only strings', async () => {
        let testVal;
        try {
          updateObj.imageUrl = [];
          await TU.update(updateObj);
        } catch (error) {
          testVal = error.message;
        }
        expect(testVal).to.equal(
          'string violation: imageUrl cannot be an array or an object'
        );
      });
    });
  });

  describe('Class methods', () => {
    //test that password is salted/hashed on creation and update (encrypt)
    //   it('"password" column is encrypted with salting and hashing', async () => {
    //     //placeholder
    //   });
    //   it('"password" column is re-encrypted on update', async () => {
    //     //placeholder
    //   });
    //   it('"salt" column is randomly generated on account creation', async () => {
    //     //placeholder
    //   });
    //   it('"salt" column is randomly regenerated on password update', async () => {
    //     //placeholder
    //   });
  });

  describe('Instance methods', () => {
    //correct password
  });
});

// ,
//   describe('instanceMethods', () => {
//     describe('correctPassword', () => {
//       let cody;
//       beforeEach(async () => {
//         cody = await User.create({
//           email: 'cody@puppybook.com',
//           password: 'bones'
//         });
//       });

//       it('returns true if the password is correct', () => {
//         expect(cody.correctPassword('bones')).to.be.equal(true);
//       });

//       it('returns false if the password is incorrect', () => {
//         expect(cody.correctPassword('bonez')).to.be.equal(false);
//       });
//     }); // end describe('correctPassword')
//   }); // end describe('instanceMethods')
