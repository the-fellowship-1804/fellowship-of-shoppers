const { expect } = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
  let spaceballOne;
  beforeEach(() => {
    return db.sync({ force: true });
  });
  beforeEach(async () => {
    spaceballOne = await Product.create({
      name: 'Spaceball One',
      price: 13.37
    });
  });
  describe('Basic functionality for Product model', () => {
    describe('Each desired column exists;', () => {
      it('has a "name" column', () =>
        expect(spaceballOne.name).to.equal('Spaceball One'));
      it('has a "price" column', () =>
        expect(spaceballOne.price).to.equal('13.37'));
      it('has a "imageUrl" column', () =>
        expect(spaceballOne.imageUrl).to.equal(null));
      it('has a "weight" column', () =>
        expect(spaceballOne.weight).to.equal(null));
      it('has a "length" column', () =>
        expect(spaceballOne.length).to.equal(null));
      it('has a "width" column', () =>
        expect(spaceballOne.width).to.equal(null));
      it('has a "depth" column', () =>
        expect(spaceballOne.depth).to.equal(null));
      it('has a "topSpeed" column', () =>
        expect(spaceballOne.topSpeed).to.equal(null));
      it('has a "acceleration" column', () =>
        expect(spaceballOne.acceleration).to.equal(null));
      it('has a "class" column', () =>
        expect(spaceballOne.class).to.equal(null));
      it('has a "description" column', () =>
        expect(spaceballOne.description).to.equal(null));
    });

    describe('Each column accepts only the correct data types', () => {
      let currentColumn;
      currentColumn = 'name';
      it(`has its "${currentColumn}" column accept only strings`, async () => {
        currentColumn = 'name';
        let testerValue;
        try {
          let updateObj = {};
          updateObj[currentColumn] = [999];
          await spaceballOne.update(updateObj);
          testerValue = 'did not error :(';
        } catch (e) {
          testerValue = currentColumn;
        }
        expect(testerValue).to.equal(currentColumn);
        try {
          let updateObj = {};
          updateObj[currentColumn] = 'a Winnebago';
          await spaceballOne.update(updateObj);
          testerValue = currentColumn + currentColumn;
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal(currentColumn + currentColumn);
        expect(spaceballOne[currentColumn]).to.equal('a Winnebago');
      });
      currentColumn = `price`;
      it(`has its "${currentColumn}" column accept only numbers`, async () => {
        currentColumn = `price`;
        let testerValue;
        try {
          let updateObj = {};
          updateObj[currentColumn] = `this shouldn't work`;
          await spaceballOne.update(updateObj);
          testerValue = 'did not error :(';
        } catch (e) {
          testerValue = currentColumn;
        }
        expect(testerValue).to.equal(currentColumn);
        try {
          let updateObj = {};
          updateObj[currentColumn] = 1000000;
          await spaceballOne.update(updateObj);
          testerValue = currentColumn + currentColumn;
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal(currentColumn + currentColumn);
        expect(spaceballOne[currentColumn]).to.equal(1000000);
      });
      currentColumn = `weight`;
      it(`has its "${currentColumn}" column accept only numbers`, async () => {
        currentColumn = `weight`;
        let testerValue;
        try {
          let updateObj = {};
          updateObj[currentColumn] = `this also shoudln't work`;
          await spaceballOne.update(updateObj);
          testerValue = 'did not error :(';
        } catch (e) {
          testerValue = currentColumn;
        }
        expect(testerValue).to.equal(currentColumn);
        try {
          let updateObj = {};
          updateObj[currentColumn] = 10;
          await spaceballOne.update(updateObj);
          testerValue = currentColumn + currentColumn;
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal(currentColumn + currentColumn);
        expect(spaceballOne[currentColumn]).to.equal(10);
      });
      currentColumn = `length`;
      it(`has its "${currentColumn}" column accept only numbers`, async () => {
        currentColumn = `length`;
        let testerValue;
        try {
          let updateObj = {};
          updateObj[currentColumn] = `string`;
          await spaceballOne.update(updateObj);
          testerValue = 'did not error :(';
        } catch (e) {
          testerValue = currentColumn;
        }
        expect(testerValue).to.equal(currentColumn);
        try {
          let updateObj = {};
          updateObj[currentColumn] = 98;
          await spaceballOne.update(updateObj);
          testerValue = currentColumn + currentColumn;
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal(currentColumn + currentColumn);
        expect(spaceballOne[currentColumn]).to.equal(98);
      });
      currentColumn = `width`;
      it(`has its "${currentColumn}" column accept only numbers`, async () => {
        currentColumn = `width`;
        let testerValue;
        try {
          let updateObj = {};
          updateObj[currentColumn] = 'string';
          await spaceballOne.update(updateObj);
          testerValue = 'did not error :(';
        } catch (e) {
          testerValue = currentColumn;
        }
        expect(testerValue).to.equal(currentColumn);
        try {
          let updateObj = {};
          updateObj[currentColumn] = 900;
          await spaceballOne.update(updateObj);
          testerValue = currentColumn + currentColumn;
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal(currentColumn + currentColumn);
        expect(spaceballOne[currentColumn]).to.equal(900);
      });
      currentColumn = `depth`;
      it(`has its "${currentColumn}" column accept only numbers`, async () => {
        currentColumn = `depth`;
        let testerValue;
        try {
          let updateObj = {};
          updateObj[currentColumn] = 'string';
          await spaceballOne.update(updateObj);
          testerValue = 'did not error :(';
        } catch (e) {
          testerValue = currentColumn;
        }
        expect(testerValue).to.equal(currentColumn);
        try {
          let updateObj = {};
          updateObj[currentColumn] = 1337;
          await spaceballOne.update(updateObj);
          testerValue = currentColumn + currentColumn;
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal(currentColumn + currentColumn);
        expect(spaceballOne[currentColumn]).to.equal(1337);
      });
      currentColumn = `topSpeed`;
      it(`has its "${currentColumn}" column accept only numbers`, async () => {
        currentColumn = `topSpeed`;
        let testerValue;
        try {
          let updateObj = {};
          updateObj[currentColumn] = `string not a number`;
          await spaceballOne.update(updateObj);
          testerValue = 'did not error :(';
        } catch (e) {
          testerValue = currentColumn;
        }
        expect(testerValue).to.equal(currentColumn);
        try {
          let updateObj = {};
          updateObj[currentColumn] = 9000;
          await spaceballOne.update(updateObj);
          testerValue = currentColumn + currentColumn;
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal(currentColumn + currentColumn);
        expect(spaceballOne[currentColumn]).to.equal(9000);
      });
      currentColumn = `acceleration`;
      it(`has its "${currentColumn}" column accept only numbers`, async () => {
        currentColumn = `acceleration`;
        let testerValue;
        try {
          let updateObj = {};
          updateObj[currentColumn] = 'slow computer';
          await spaceballOne.update(updateObj);
          testerValue = 'did not error :(';
        } catch (e) {
          testerValue = currentColumn;
        }
        expect(testerValue).to.equal(currentColumn);
        try {
          let updateObj = {};
          updateObj[currentColumn] = 9002;
          await spaceballOne.update(updateObj);
          testerValue = currentColumn + currentColumn;
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal(currentColumn + currentColumn);
        expect(spaceballOne[currentColumn]).to.equal(9002);
      });
      currentColumn = `class`;
      it(`has its "${currentColumn}" column accept only strings`, async () => {
        currentColumn = `class`;
        let testerValue;
        try {
          let updateObj = {};
          updateObj[currentColumn] = { 4: 900 };
          await spaceballOne.update(updateObj);
          testerValue = 'did not error :(';
        } catch (e) {
          testerValue = currentColumn;
        }
        expect(testerValue).to.equal(currentColumn);
        try {
          let updateObj = {};
          updateObj[currentColumn] = `six`;
          await spaceballOne.update(updateObj);
          testerValue = currentColumn + currentColumn;
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal(currentColumn + currentColumn);
        expect(spaceballOne[currentColumn]).to.equal(`six`);
      });
      currentColumn = `description`;
      it(`has its "${currentColumn}" column accept large string inputs`, async () => {
        currentColumn = `description`;
        let testerValue;
        try {
          let updateObj = {};
          updateObj[currentColumn] = [99];
          await spaceballOne.update(updateObj);
          testerValue = 'did not error :(';
        } catch (e) {
          testerValue = currentColumn;
        }
        expect(testerValue).to.equal(currentColumn);
        try {
          let updateObj = {};
          updateObj[currentColumn] = longText;
          await spaceballOne.update(updateObj);
          testerValue = currentColumn + currentColumn;
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal(currentColumn + currentColumn);
        expect(spaceballOne[currentColumn]).to.equal(longText);
      });
      currentColumn = `imageUrl`;
      it(`has its "${currentColumn}" column accept only strings`, async () => {
        currentColumn = `imageUrl`;
        let testerValue;
        try {
          let updateObj = {};
          updateObj[currentColumn] = [90928];
          await spaceballOne.update(updateObj);
          testerValue = 'did not error :(';
        } catch (e) {
          testerValue = currentColumn;
        }
        expect(testerValue).to.equal(currentColumn);
        try {
          let updateObj = {};
          updateObj[currentColumn] = `www.rickroll.com`;
          await spaceballOne.update(updateObj);
          testerValue = currentColumn + currentColumn;
        } catch (e) {
          testerValue = "it errored where it shouldn't have :(";
        }
        expect(testerValue).to.equal(currentColumn + currentColumn);
        expect(spaceballOne[currentColumn]).to.equal(`www.rickroll.com`);
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
