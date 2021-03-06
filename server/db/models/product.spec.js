const { expect, assert } = require('chai');
const db = require('../index');
const Product = db.model('product');
const lI = require('lorem-ipsum');

describe('Product model', () => {
  describe('Basic functionality for Product model', () => {
    it('The model exists', () => expect(Product).not.to.be.an('undefined'));
  });
  describe('Each desired column exists', () => {
    let TP;
    before(async () => {
      try {
        await db.sync({ force: true });
        TP = await Product.create();
      } catch (error) {
        console.log(error);
      }
    });
    it('has a "name" column', () => expect(TP.name).not.to.be.an('undefined'));
    it('has a "imageUrl" column', () =>
      expect(TP.imageUrl).not.to.be.an('undefined'));
    it('has a "price" column', () =>
      expect(TP.price).not.to.be.an('undefined'));
    it('has a "weight" column', () =>
      expect(TP.weight).not.to.be.an('undefined'));
    it('has a "length" column', () =>
      expect(TP.length).not.to.be.an('undefined'));
    it('has a "width" column', () =>
      expect(TP.width).not.to.be.an('undefined'));
    it('has a "depth" column', () =>
      expect(TP.depth).not.to.be.an('undefined'));
    it('has a "diameter" column', () =>
      expect(TP.diameter).not.to.be.an('undefined'));
    it('has a "topSpeed" column', () =>
      expect(TP.topSpeed).not.to.be.an('undefined'));
    it('has a "acceleration" column', () =>
      expect(TP.acceleration).not.to.be.an('undefined'));
    it('has a "class" column', () =>
      expect(TP.class).not.to.be.an('undefined'));
    it('has a "crew" column', () => expect(TP.crew).not.to.be.an('undefined'));
    it('has a "firepower" column', () =>
      expect(TP.firepower).not.to.be.an('undefined'));
    it('has a "description" column', () =>
      expect(TP.description).not.to.be.an('undefined'));
  });

  describe('Each column accepts only the correct data types', () => {
    let TP;
    before(async () => {
      try {
        await db.sync({ force: true });
        TP = await Product.create();
      } catch (error) {
        console.log(error);
      }
    });

    it(`"name" column accepts only strings`, async () => {
      let testVal;
      try {
        await TP.update({ name: [] });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"imageUrl" column accepts only strings`, async () => {
      let testVal;
      try {
        await TP.update({ imageUrl: [] });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
      before(async () => {
        TP = await Product.create();
      });

      describe('Basic functionality for Product model', () => {
        it('The model exists', () => assert.isDefined(TP));
        describe('Each desired column exists', () => {
          it('has a "name" column', () => assert.isDefined(TP.name));
          it('has a "imageUrl" column', () => assert.isDefined(TP.imageUrl));
          it('has a "price" column', () => assert.isDefined(TP.price));
          it('has a "weight" column', () => assert.isDefined(TP.weight));
          it('has a "length" column', () => assert.isDefined(TP.length));
          it('has a "width" column', () => assert.isDefined(TP.width));
          it('has a "depth" column', () => assert.isDefined(TP.depth));
          it('has a "topSpeed" column', () => assert.isDefined(TP.topSpeed));
          it('has a "acceleration" column', () =>
            assert.isDefined(TP.acceleration));
          it('has a "class" column', () => assert.isDefined(TP.class));
          it('has a "description" column', () =>
            assert.isDefined(TP.description));
        });

        describe('Each column accepts only the correct data types', () => {
          let updateObj = {};

          it(`"name" column accepts only strings`, async () => {
            let testVal;
            try {
              updateObj.name = [];
              await TP.update(updateObj);
            } catch (error) {
              testVal = error.message;
            }
            expect(testVal).to.equal(
              'string violation: name cannot be an array or an object'
            );
            try {
              updateObj.name = 'string';
              await TP.update(updateObj);
              testVal = 'No error thrown when given a string';
            } catch (error) {
              testVal = 'Threw error when given a string';
            }
            expect(testVal).to.equal('No error thrown when given a string');
            expect(TP.name).to.equal('string');
          });

          it(`"price" column accepts only numbers`, async () => {
            let testVal;
            try {
              updateObj.price = 'this should error';
              await TP.update(updateObj);
            } catch (error) {
              testVal = error.message;
            }
            expect(testVal).to.equal(
              'invalid input syntax for type numeric: "this should error"'
            );
            try {
              updateObj.price = 0;
              await TP.update(updateObj);
              testVal = 'No error thrown when given a number';
            } catch (error) {
              testVal = 'Threw error when given a number';
            }
            expect(testVal).to.equal('No error thrown when given a number');
            expect(TP.price).to.equal(0);
          });

          it(`"weight" column accepts only numbers`, async () => {
            let testVal;
            try {
              updateObj.weight = 'this should error';
              await TP.update(updateObj);
            } catch (error) {
              testVal = error.message;
            }
            expect(testVal).to.equal(
              'invalid input syntax for type numeric: "this should error"'
            );
            try {
              updateObj.weight = 0;
              await TP.update(updateObj);
              testVal = 'No error thrown when given a number';
            } catch (error) {
              testVal = 'Error thrown when given a number';
            }
            expect(testVal).to.equal('No error thrown when given a number');
            expect(TP.weight).to.equal(0);
          });

          it(`"length" column accepts only numbers`, async () => {
            let testVal;
            try {
              updateObj.length = 'this should error';
              await TP.update(updateObj);
            } catch (error) {
              testVal = error.message;
            }
            expect(testVal).to.equal(
              'invalid input syntax for type numeric: "this should error"'
            );
            try {
              updateObj.length = 0;
              await TP.update(updateObj);
              testVal = 'No error thrown when given a number';
            } catch (error) {
              testVal = 'Error thrown when given a number';
            }
            expect(testVal).to.equal('No error thrown when given a number');
            expect(TP.length).to.equal(0);
          });

          it(`"width" column accepts only numbers`, async () => {
            let testVal;
            try {
              updateObj.width = 'this should error';
              await TP.update(updateObj);
            } catch (error) {
              testVal = error.message;
            }
            expect(testVal).to.equal(
              'invalid input syntax for type numeric: "this should error"'
            );
            try {
              updateObj.width = 0;
              await TP.update(updateObj);
              testVal = 'No error thrown when given a number';
            } catch (error) {
              testVal = "it errored where it shouldn't have :(";
            }
            expect(testVal).to.equal('No error thrown when given a number');
            expect(TP.width).to.equal(0);
          });

          it(`"depth" column accepts only numbers`, async () => {
            let testVal;
            try {
              updateObj.depth = 'this should error';
              await TP.update(updateObj);
            } catch (error) {
              testVal = error.message;
            }
            expect(testVal).to.equal(
              'invalid input syntax for type numeric: "this should error"'
            );
            try {
              updateObj.depth = 1337;
              await TP.update(updateObj);
              testVal = 'No error thrown when given a number';
            } catch (error) {
              testVal = "it errored where it shouldn't have :(";
            }
            expect(testVal).to.equal('No error thrown when given a number');
            expect(TP.depth).to.equal(1337);
          });

          it(`"topSpeed" column accepts only numbers`, async () => {
            let testVal;
            try {
              updateObj.topSpeed = 'this should error';
              await TP.update(updateObj);
            } catch (error) {
              testVal = error.message;
            }
            expect(testVal).to.equal(
              'invalid input syntax for type numeric: "this should error"'
            );
            try {
              updateObj.topSpeed = 9000;
              await TP.update(updateObj);
              testVal = 'No error thrown when given a number';
            } catch (error) {
              testVal = "it errored where it shouldn't have :(";
            }
            expect(testVal).to.equal('No error thrown when given a number');
            expect(TP.topSpeed).to.equal(9000);
          });

          it(`"acceleration" column accepts only numbers`, async () => {
            let testVal;
            try {
              updateObj.acceleration = 'this should error';
              await TP.update(updateObj);
            } catch (error) {
              testVal = error.message;
            }
            expect(testVal).to.equal(
              'invalid input syntax for type numeric: "this should error"'
            );
            try {
              updateObj.acceleration = 9002;
              await TP.update(updateObj);
              testVal = 'No error thrown when given a number';
            } catch (error) {
              testVal = "it errored where it shouldn't have :(";
            }
            expect(testVal).to.equal('No error thrown when given a number');
            expect(TP.acceleration).to.equal(9002);
          });

          it(`"class" column accepts only strings`, async () => {
            let testVal;
            try {
              updateObj.class = {};
              await TP.update(updateObj);
            } catch (error) {
              testVal = error.message;
            }
            expect(testVal).to.equal(
              'string violation: class cannot be an array or an object'
            );
            try {
              updateObj.class = `string`;
              await TP.update(updateObj);
              testVal = 'No error thrown when given a string';
            } catch (error) {
              testVal = "it errored where it shouldn't have :(";
            }
            expect(testVal).to.equal('No error thrown when given a string');
            expect(TP.class).to.equal(`string`);
          });

          it(`"description" column accepts large string inputs`, async () => {
            let testVal;
            try {
              updateObj.description = [];
              await TP.update(updateObj);
            } catch (error) {
              testVal = error.message;
            }
            expect(testVal).to.equal(
              'string violation: description cannot be an array or an object'
            );
            const longText = lI();
            try {
              updateObj.description = longText;
              await TP.update(updateObj);
              testVal = 'No error thrown when given a string';
            } catch (error) {
              testVal = 'Threw error when given a string';
            }
            expect(testVal).to.equal('No error thrown when given a string');
            expect(TP.description).to.equal(longText);
          });

          it(`"imageUrl" column accepts only strings`, async () => {
            let testVal;
            try {
              updateObj.imageUrl = [];
              await TP.update(updateObj);
            } catch (error) {
              testVal = error.message;
            }
            expect(testVal).to.equal(
              'string violation: imageUrl cannot be an array or an object'
            );
            try {
              updateObj.imageUrl = `string`;
              await TP.update(updateObj);
              testVal = 'No error thrown when given a string';
            } catch (error) {
              testVal = 'Threw error when given a string';
            }
            expect(testVal).to.equal('No error thrown when given a string');
            expect(TP.imageUrl).to.equal(`string`);
          });
        });

        it(`"price" column accepts only numbers`, async () => {
          let testVal;
          try {
            await TP.update({ price: 'string' });
          } catch (error) {
            testVal = error;
          }
          expect(testVal).to.be.an('error');
        });

        it(`"weight" column accepts only numbers`, async () => {
          let testVal;
          try {
            await TP.update({ weight: 'string' });
          } catch (error) {
            testVal = error;
          }
          expect(testVal).to.be.an('error');
        });

        it(`"length" column accepts only numbers`, async () => {
          let testVal;
          try {
            await TP.update({ length: 'string' });
          } catch (error) {
            testVal = error;
          }
          expect(testVal).to.be.an('error');
        });

        it(`"width" column accepts only numbers`, async () => {
          let testVal;
          try {
            await TP.update({ width: 'string' });
          } catch (error) {
            testVal = error;
          }
          expect(testVal).to.be.an('error');
        });

        it(`"depth" column accepts only numbers`, async () => {
          let testVal;
          try {
            await TP.update({ depth: 'string' });
          } catch (error) {
            testVal = error;
          }
          expect(testVal).to.be.an('error');
        });

        it(`"diameter" column accepts only numbers`, async () => {
          let testVal;
          try {
            await TP.update({ diameter: 'string' });
          } catch (error) {
            testVal = error;
          }
          expect(testVal).to.be.an('error');
        });

        it(`"topSpeed" column accepts only numbers`, async () => {
          let testVal;
          try {
            await TP.update({ topSpeed: 'string' });
          } catch (error) {
            testVal = error;
          }
          expect(testVal).to.be.an('error');
        });

        it(`"acceleration" column accepts only numbers`, async () => {
          let testVal;
          try {
            await TP.update({ acceleration: 'string' });
          } catch (error) {
            testVal = error;
          }
          expect(testVal).to.be.an('error');
        });

        it(`"class" column accepts only strings`, async () => {
          let testVal;
          try {
            await TP.update({ class: [] });
          } catch (error) {
            testVal = error;
          }
          expect(testVal).to.be.an('error');
        });

        it(`"cew" column accepts only integers`, async () => {
          let testVal;
          try {
            await TP.update({ crew: 'string' });
          } catch (error) {
            testVal = error;
          }
          expect(testVal).to.be.an('error');
        });

        it(`"firepower" column accepts only integers`, async () => {
          let testVal;
          try {
            await TP.update({ firepower: 'string' });
          } catch (error) {
            testVal = error;
          }
          expect(testVal).to.be.an('error');
        });

        it(`"description" column accepts only strings`, async () => {
          let testVal;
          try {
            await TP.update({ description: [] });
          } catch (error) {
            testVal = error;
          }
          expect(testVal).to.be.an('error');
        });

        it(`"description" column can accept long strings`, async () => {
          let testVal;
          try {
            await TP.update({
              description: lI({
                count: 1,
                units: 'paragraphs',
                paragraphLowerBound: 1000,
                format: 'plain'
              })
            });
            testVal = 'success';
          } catch (error) {
            testVal = error;
          }
          expect(testVal).to.equal('success');
        });
      });
    });
  });
});
