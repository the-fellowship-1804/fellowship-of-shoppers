const router = require('express').Router();
module.exports = router;

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST_KEY);

const charge = req => {
  return stripe.charges.create({
    amount: Number(req.params.price) * 100,
    currency: process.env.STRIPE_CCY,
    source: req.body.stripeTokenId
  });
};

router.post('/:price', async (req, res, next) => {
  try {
    const charged = await charge(req);
    res.json(charged);
  } catch (error) {
    next(error);
  }
});
