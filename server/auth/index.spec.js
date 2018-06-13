const { expect } = require('chai');
const { cartMerge } = require('../db/models');

describe('Helper methods for routes', () => {
  describe('the cartMerge function', () => {
    let [
      incomingCart,
      outgoingCart0,
      outgoingCart1,
      outgoingCart2,
      outgoingCart3,
      outgoingCart4
    ] = [[], [], [], [], [], []];
    beforeEach('defend against mutation', () => {
      incomingCart = [
        {
          product: { name: 'The Death Star', id: 2 },
          quantity: 6
        },
        { product: { name: 'Enterprise-D', id: 4 }, quantity: 4 }
      ];
      outgoingCart0 = [
        {
          product: { name: 'The Death Star', id: 2 },
          quantity: 6
        },
        { product: { name: 'Enterprise-D', id: 4 }, quantity: 4 }
      ];
      outgoingCart1 = [
        { product: { name: 'Spaceball One', id: 7 }, quantity: 1 }
      ];
      outgoingCart2 = [
        { product: { name: 'The Death Star', id: 2 }, quantity: 6 },
        { product: { name: 'Enterprise-D', id: 4 }, quantity: 4 }
      ];
      outgoingCart3 = [
        { product: { name: 'The Death Star', id: 2 }, quantity: 3 },
        { product: { name: 'Enterprise-D', id: 4 }, quantity: 7 }
      ];
      outgoingCart4 = [
        { product: { name: 'The Death Star', id: 2 }, quantity: 3 },
        { product: { name: 'Enterprise-D', id: 4 }, quantity: 7 },
        { product: { name: 'Spaceball One', id: 7 }, quantity: 1 }
      ];
    });
    it('merges two carts without error', () => {
      expect(cartMerge(outgoingCart0, incomingCart.slice())).to.deep.equal(
        incomingCart.slice()
      );
    });
    it('adds items in the outgoing cart that do not exist in the incoming cart', () => {
      expect(cartMerge(outgoingCart1, incomingCart.slice())).to.deep.equal([
        {
          product: { name: 'The Death Star', id: 2 },
          quantity: 6
        },
        { product: { name: 'Enterprise-D', id: 4 }, quantity: 4 },
        { product: { name: 'Spaceball One', id: 7 }, quantity: 1 }
      ]);
    });
    it('does not overwrite when the outgoing cart has equal or lesser values', () => {
      expect(cartMerge(outgoingCart2, incomingCart.slice())).to.deep.equal(
        incomingCart.slice()
      );
    });
    it('selectively merges quantities wherein the outgoing cart has its quantity used if this quantity is greater', () => {
      expect(cartMerge(outgoingCart3, incomingCart.slice())).to.deep.equal([
        { product: { name: 'The Death Star', id: 2 }, quantity: 6 },
        { product: { name: 'Enterprise-D', id: 4 }, quantity: 7 }
      ]);
    });
    it('does all these things at once', () => {
      expect(cartMerge(outgoingCart4, incomingCart.slice())).to.deep.equal([
        { product: { name: 'The Death Star', id: 2 }, quantity: 6 },
        { product: { name: 'Enterprise-D', id: 4 }, quantity: 7 },
        { product: { name: 'Spaceball One', id: 7 }, quantity: 1 }
      ]);
    });
  });
});
