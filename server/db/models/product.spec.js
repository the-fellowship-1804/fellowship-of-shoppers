const { expect, assert } = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
  let TP;
  beforeEach(async () => {
    await db.sync({ force: true });
  });
  beforeEach(async () => {
    TP = await Product.create();
  });

  describe('Basic functionality for Product model', () => {
    describe('Each desired column exists;', () => {
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
      let currentColumn;
      let updateObj = {};

      it(`has its "name" column accepts only strings`, async () => {
        let testerValue;
        try {
          currentColumn = 'name';
          updateObj[currentColumn] = [0];
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a non-string datatype';
        } catch (e) {
          testerValue = e.message;
        }
        expect(testerValue).to.equal(
          'string violation: name cannot be an array or an object'
        );
        try {
          updateObj[currentColumn] = 'string';
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a string';
        } catch (e) {
          testerValue = 'Threw error when given a string';
        }
        expect(testerValue).to.equal('No error thrown when given a string');
        expect(TP[currentColumn]).to.equal('string');
      });

      it(`has its "price" column accept only numbers`, async () => {
        currentColumn = `price`;
        let testerValue;
        try {
          updateObj[currentColumn] = 'this should error';
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a non-number datatype';
        } catch (e) {
          testerValue = e.message;
        }
        expect(testerValue).to.equal(
          'invalid input syntax for type numeric: "this should error"'
        );
        try {
          updateObj[currentColumn] = 0;
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a number';
        } catch (e) {
          testerValue = 'Threw error when given a number';
        }
        expect(testerValue).to.equal('No error thrown when given a number');
        expect(TP[currentColumn]).to.equal(0);
      });

      it(`has its "weight" column accept only numbers`, async () => {
        currentColumn = `weight`;
        let testerValue;
        try {
          updateObj[currentColumn] = 'this should error';
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a non-number datatype';
        } catch (e) {
          testerValue = e.message;
        }
        expect(testerValue).to.equal(
          'invalid input syntax for type numeric: "this should error"'
        );
        try {
          updateObj[currentColumn] = 0;
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a number';
        } catch (e) {
          testerValue = 'Error thrown when given a number';
        }
        expect(testerValue).to.equal('No error thrown when given a number');
        expect(TP[currentColumn]).to.equal(0);
      });

      it(`has its "length" column accept only numbers`, async () => {
        currentColumn = `length`;
        let testerValue;
        try {
          updateObj[currentColumn] = 'this should error';
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a non-number datatype';
        } catch (e) {
          testerValue = e.message;
        }
        expect(testerValue).to.equal(
          'invalid input syntax for type numeric: "this should error"'
        );
        try {
          updateObj[currentColumn] = 0;
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a number';
        } catch (e) {
          testerValue = 'Error thrown when given a number';
        }
        expect(testerValue).to.equal('No error thrown when given a number');
        expect(TP[currentColumn]).to.equal(0);
      });

      it(`has its "width" column accept only numbers`, async () => {
        currentColumn = `width`;
        let testerValue;
        try {
          updateObj[currentColumn] = 'this should error';
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a non-number datatype';
        } catch (e) {
          testerValue = e.message;
        }
        expect(testerValue).to.equal(
          'invalid input syntax for type numeric: "this should error"'
        );
        try {
          updateObj[currentColumn] = 900;
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a number';
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal('No error thrown when given a number');
        expect(TP[currentColumn]).to.equal(900);
      });

      it(`has its "depth" column accept only numbers`, async () => {
        currentColumn = `depth`;
        let testerValue;
        try {
          updateObj[currentColumn] = 'this should error';
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a non-number datatype';
        } catch (e) {
          testerValue = e.message;
        }
        expect(testerValue).to.equal(
          'invalid input syntax for type numeric: "this should error"'
        );
        try {
          updateObj[currentColumn] = 1337;
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a number';
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal('No error thrown when given a number');
        expect(TP[currentColumn]).to.equal(1337);
      });

      it(`has its "topSpeed" column accept only numbers`, async () => {
        currentColumn = `topSpeed`;
        let testerValue;
        try {
          updateObj[currentColumn] = 'this should error';
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a non-number datatype';
        } catch (e) {
          testerValue = e.message;
        }
        expect(testerValue).to.equal(
          'invalid input syntax for type numeric: "this should error"'
        );
        try {
          updateObj[currentColumn] = 9000;
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a number';
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal('No error thrown when given a number');
        expect(TP[currentColumn]).to.equal(9000);
      });

      it(`has its "acceleration" column accept only numbers`, async () => {
        currentColumn = `acceleration`;
        let testerValue;
        try {
          updateObj[currentColumn] = 'this should error';
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a non-number datatype';
        } catch (e) {
          testerValue = e.message;
        }
        expect(testerValue).to.equal(
          'invalid input syntax for type numeric: "this should error"'
        );
        try {
          updateObj[currentColumn] = 9002;
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a number';
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal('No error thrown when given a number');
        expect(TP[currentColumn]).to.equal(9002);
      });

      it(`has its "class" column accept only strings`, async () => {
        currentColumn = `class`;
        let testerValue;
        try {
          updateObj[currentColumn] = { 4: 900 };
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a non-string datatype';
        } catch (e) {
          testerValue = e.message;
        }
        expect(testerValue).to.equal(
          'string violation: class cannot be an array or an object'
        );
        try {
          updateObj[currentColumn] = `string`;
          await TP.update(updateObj);
          testerValue = currentColumn + currentColumn;
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal(currentColumn + currentColumn);
        expect(TP[currentColumn]).to.equal(`string`);
      });

      it(`has its "description" column accept large string inputs`, async () => {
        currentColumn = `description`;
        let testerValue;
        try {
          updateObj[currentColumn] = [0];
          await TP.update(updateObj);
          testerValue =
            'No error thrown when given a non-large-string datatype';
        } catch (e) {
          testerValue = e.message;
        }
        expect(testerValue).to.equal(
          'string violation: description cannot be an array or an object'
        );
        try {
          updateObj[currentColumn] = longText;
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a string';
        } catch (e) {
          testerValue = 'Threw error when given a string';
        }
        expect(testerValue).to.equal('No error thrown when given a string');
        expect(TP[currentColumn]).to.equal(longText);
      });

      it(`has its "imageUrl" column accept only strings`, async () => {
        currentColumn = `imageUrl`;
        let testerValue;
        try {
          updateObj[currentColumn] = [0];
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a non-string datatype';
        } catch (e) {
          testerValue = e.message;
        }
        expect(testerValue).to.equal(
          'string violation: imageUrl cannot be an array or an object'
        );
        try {
          updateObj[currentColumn] = `string`;
          await TP.update(updateObj);
          testerValue = 'No error thrown when given a string';
        } catch (e) {
          testerValue = 'Threw error when given a string';
        }
        expect(testerValue).to.equal('No error thrown when given a string');
        expect(TP[currentColumn]).to.equal(`string`);
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
