const router = require('express').Router();
const { Product } = require('../db/models');
module.exports = router;

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST_KEY);

const calculatePrice = async cart => {
  let amount = 0;
  for (let i = 0; i < cart.length; i++) {
    //forEach does not work with async for "reasons"
    try {
      const secureProduct = await Product.findById(cart[i].product.id);
      amount += secureProduct.price * cart[i].quantity;
    } catch (error) {
      console.log(error);
    }
  }
  return amount * 100;
};

const charge = (req, price) => {
  return stripe.charges.create({
    amount: price,
    currency: process.env.STRIPE_CCY,
    source: req.body.stripeTokenId
  });
};

router.post('/', async (req, res, next) => {
  try {
    const price = await calculatePrice(req.body.cart);
    const charged = await charge(req, price);
    res.json(charged);
  } catch (error) {
    next(error);
  }
});
