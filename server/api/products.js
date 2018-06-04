const router = require('express').Router();
const { Product } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:productid', async (req, res, next) => {
  try {
    const productId = req.params.productid;
    const product = await Product.findById(productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.setStatus(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// router put

// router delete
