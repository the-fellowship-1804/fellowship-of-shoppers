const { expect, assert } = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
  let TP;
  before(async () => {
    await db.sync({ force: true });
  });
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
      it('has a "description" column', () => assert.isDefined(TP.description));
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
  });
});

const longText = `Promises are composable representations of asynchronous values, which have become native and widespread in JavaScript. The redux-promise and redux-promise-middleware packages enable dispatching promises or action objects containing promises. Both have some good capabilities and make handling async in Redux somewhat more convenient. However, neither addresses the issue of impurity. Promises are eager; they represent an async action that has already been initiated (in contrast to a Task, which is like a lazy Promise – user code is not actually executed unless you call run.)

Naive Promises Use
An initial attempt at using promises (without thunks) in Redux might appear as follows:


Look closely; this is essentially our “Call Async Directly” idea again. The promiseLogin function eventually dispatches an action from within a success handler. We are also dispatching the initial promise to the store, but what would any potential middleware do with that promise? At best, we'd want a hypothetical redux-promise-naive middleware to discard the promise so it doesn't end up in the reducer. That's doable, but overlooks some issues:

Again, calling async code immediately makes our component / action-creator impure, which is difficult to work with and test.
Our promiseLogin is still coupled to a specific store, reducing reusability.
It can be tricky to distinguish a promise object from an action object. P/A+ promises have a painstaking [[promiseResolutionProcedure]] for duck-typing promises safely. The foolproof way to deal with this uncertainty is to coerce values using Promise.resolve, but doing so for every Redux action is a bit heavy-handed.
Smarter Promise Usage
The real redux-promise and redux-promise-middleware packages are smarter than our hypothetical redux-promise-naive. They allow dispatching promises or actions with promise payloads, and when the promise is fulfilled, the middleware will dispatch a normal action. For example:


Here, redux-promise-middleware will detect the explicitly declared payload.promise in a dispatched action. It prevents this action from going directly to the reducer, and automatically dispatches a separate 'LOGIN_PENDING' action instead. It then waits for the promise to settle, at which point it dispatches a 'LOGIN_FULFILLED' or 'LOGIN_REJECTED' action with the payload replaced by the promise's value or reason. That's a nice mix of actions we get for free, facilitating UI features like loading spinners or error notifications.

This middleware offers one improvement: promiseLogin no longer depends on a particular store. Rather, the middleware takes care of dispatching the final data to the store itself.

Unfortunately, redux-promise-middleware still hasn't contained the side effect; promiseLogin makes a network call immediately. This is arguably the Achilles' heel of promise-based redux middleware, and our components are back to being impure and needing some kind of hook or modification for testing purposes or reuse in other contexts.

Thunked Promises
As it turns out, nothing prevents us from using redux-promise-middleware alongside thunk-middleware. By delaying the creation of the promise, we gain both the laziness of thunks and the automatic action dispatching of redux-promise-middleware:


At this point, the simple core concept of thunks is beginning to be buried under complexities of debatable necessity. Do we really need two middleware libraries and to remember to use specific code patterns just to handle effects in Redux? We will examine a few alternatives shortly. Before then, there is one last note we ought to cover regarding promises and thunks.

Returning Promises from Thunks
When using redux-thunk, if a dispatched thunk returns a promise then dispatch will also return that same promise:


Once again, it is easy to abuse this pattern. One generally seeks to keep React components as pure as possible; adding async handlers back into them feels like a step backwards. It also makes our API inconsistent again.

However, there are a number of times and places where using a returned promise from a dispatch call can be nice.`;
