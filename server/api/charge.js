const router = require('express').Router();
module.exports = router;

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST_KEY);

const charge = req => {
  const token = req.body.stripeToken;
  return stripe.charges.create({
    amount: Number(req.params.price),
    currency: process.env.STRIPE_CCY,
    source: token
  });
};

router.post('/:price', async (req, res, next) => {
  try {
    const charged = await charge(req);
    console.log('charged\n\n', charged);
    res.json(charged);
  } catch (error) {
    next(error);
  }
});
