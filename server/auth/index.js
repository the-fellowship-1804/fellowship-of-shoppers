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

// router.get('/', async (req, res, next) => {
//   if (!req.session.userId) req.session.userId = -1;
//   if (req.session.userId === -1) {
//     req.session.currentUser = await User.create({
//       email: Date.now() + '@notloggedin.com'
//     });
//     req.session.userId = req.session.currentUser.id * -1;
//   }
//   next()
// });

router.get('/guest', async (req, res, next) => {
  try {
    console.log('IDDDD: ', req.session.currentUser)
    const user = await User.findById(req.session.currentUser.id)
    res.json(user)
    console.log('USERRR: ', user)
  } catch (err) {
    next(err)
  }
})

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
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
