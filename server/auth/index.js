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
    const user = await User.findById(req.session.currentUser.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.session.currentUser = await User.findOne({
        where: { id: req.session.currentUser.id }
      });
      await User.destroy({ where: { id: req.session.currentUser.id } });
      console.log('reached this point', req.session.currentUser);
      if (req.session.currentUser.cart.length) {
        console.log('req. session. curruser cart is', req.session.currentUser);
        const updatedUser = await user.update({
          cart: cartMerge(req.session.currentUser.cart, user.cart)
        });
        req.session.currentUser = updatedUser;
        req.login(updatedUser, err => (err ? next(err) : res.json(user)));
      } else {
        req.session.currentUser = user;
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    }
  } catch (e) {
    next(e);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    req.session.currentUser = await User.findOne({
      where: { id: req.session.currentUser.id }
    });
    const user = await User.create(req.body);
    await User.destroy({ where: { id: req.session.currentUser.id } });
    if (req.session.currentUser.cart.length) {
      updatedUser = await user.update({
        cart: cartMerge(req.session.currentUser.cart, user.cart)
      });
      req.session.currentUser = updatedUser;
      req.login(updatedUser, err => (err ? next(err) : res.json(updatedUser)));
    } else {
      req.session.currentUser = user;
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
