const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

//Get all users
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next);
});

//Get one user
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
});

//Update a user's info
router.put('/:id', async (req, res, next) => {
  try {
    if (req.body.addProductToCart) {
      const addedProduct = req.body.addProductToCart.product;
      const user = await User.findById(req.params.id);
      const matchedProduct = user.cart.filter(
        productObj => productObj.product.id === addedProduct.id
      );
      if (matchedProduct.length === 0) {
        await user.update({
          cart: [...user.cart, req.body.addProductToCart]
        });
      } else {
        await user.update({
          cart: user.cart.map(productObj => {
            if (productObj.product.id === addedProduct.id) {
              return {
                ...productObj,
                quantity:
                  productObj.quantity + req.body.addProductToCart.quantity
              };
            } else {
              return productObj;
            }
          })
        });
      }
      res.end();
    } else {
      const [, user] = await User.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        plain: true
      });
      res.json(user[0]);
      console.log(user);
    }
  } catch (error) {
    console.log(error);
  }
});

//Delete a user
router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: req.id
    }
  })
    .then(res.end())
    .catch(next);
});
