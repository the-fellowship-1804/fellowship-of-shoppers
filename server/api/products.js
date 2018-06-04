const router = require('express').Router();
const { Product } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  try {
    const products = Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});
