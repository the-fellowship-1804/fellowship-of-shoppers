const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

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
        const disCart = req.session.currentUser.cart;
        req.session.userId = user.id; // sets current session to user!
        User.destroy({ where: { id: req.session.currentId * -1 } });
        // const cart = user.cart;
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
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.session.userId = user.id;
      req.login(user, err => (err ? next(err) : res.json(user)));
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
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
