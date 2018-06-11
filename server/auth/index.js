const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

const cartMerge = (disCart, loggedCart) => {
  const output = loggedCart;
  for (let i = 0; i < disCart.length; i++) {
    let currentItem = disCart[i];
    let match = loggedCart.find(item => item.id === currentItem.id);
    if (!match) output.push(disCart[i]);
    else if (match.quantity >= disCart[i].quantity) continue;
    else {
      match.quantity = disCart[i].quantity;
    }
  }
  return output;
};

router.get('/guest', async (req, res, next) => {
  try {
    console.log('IDDDD: ', req.session.currentUser.id);
    const user = await User.findById(req.session.currentUser.id);
    res.json(user);
    console.log('USERRR: ', user.dataValues.email);
  } catch (err) {
    next(err);
  }
});

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        console.log('No such user found:', req.body.email);
        res.status(401).send('Wrong username and/or password');
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email);
        res.status(401).send('Wrong username and/or password');
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      const disCart = req.session.currentUser.cart;
      User.destroy({ where: { id: req.session.currentId * -1 } });
      if (disCart.length && user.cart.length) {
        const cart = cartMerge(disCart, user.cart);
        user
          .update({ cart })
          .then(user =>
            req.login(user, err => (err ? next(err) : res.json(user)))
          );
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists');
      } else {
        next(err);
      }
    });
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
