const { expect } = require('chai');
const { cartMerge } = require('.');

describe('Helper methods for routes', () => {
  describe('the cartMerge function', () => {
    const incomingCart = [
      {
        product: { name: 'The Death Star' },
        quantity: 6
      },
      { product: { name: 'Enterprise-D' }, quantity: 4 }
    ];
    const outgoingCart0 = [];
    const outgoingCart1 = [{ product: { name: 'Spaceball One' }, quantity: 1 }];
    const outgoingCart2 = [
      { product: { name: 'The Death Star' }, quantity: 6 },
      { product: { name: 'Enterprise-D' }, quantity: 4 }
    ];
    const outgoingCart3 = [
      { product: { name: 'The Death Star' }, quantity: 3 },
      { product: { name: 'Enterprise-D' }, quantity: 7 }
    ];
    const outgoingCart4 = [
      { product: { name: 'The Death Star' }, quantity: 3 },
      { product: { name: 'Enterprise-D' }, quantity: 7 },
      { product: { name: 'Spaceball One' }, quantity: 1 }
    ];
    it('merges two carts without error', () => {
      expect(cartMerge(outgoingCart0, incomingCart)).to.equal(incomingCart);
    });
    it('adds items in the outgoing cart that do not exist in the incoming cart', () => {
      expect(cartMerge(outgoingCart1, incomingCart)).to.equal({
        ...outgoingCart1,
        ...incomingCart
      });
    });
    it('does not overwrite when the outgoing cart has equal or lesser values', () => {
      expect(cartMerge(outgoingCart2, incomingCart)).to.equal(incomingCart);
    });
    it('selectively merges quantities wherein the outgoing cart has its quantity used if this quantity is greater', () => {
      expect(cartMerge(outgoingCart3, incomingCart)).to.equal([
        { product: { name: 'The Death Star' }, quantity: 6 },
        { product: { name: 'Enterprise-D' }, quantity: 7 }
      ]);
    });
    it('does all these things at once', () => {
      expect(cartMerge(outgoingCart4, incomingCart)).to.equal([
        { product: { name: 'The Death Star' }, quantity: 6 },
        { product: { name: 'Enterprise-D' }, quantity: 7 },
        { product: { name: 'Spaceball One' }, quantity: 1 }
      ]);
    });
  });
});
