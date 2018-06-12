const User = require('./user');
const Product = require('./product.js');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

const cartMerge = (disCart, loggedCart) => {
  const output = loggedCart;
  for (let i = 0; i < disCart.length; i++) {
    let currentItem = disCart[i];
    let match = loggedCart.find(
      item => item.product.id === currentItem.product.id
    );
    if (!match) {
      output.push(disCart[i]);
    } else if (match.quantity >= disCart[i].quantity) continue;
    else {
      match.quantity = disCart[i].quantity;
    }
  }
  return output;
};

module.exports = {
  User,
  Product,
  cartMerge
};
