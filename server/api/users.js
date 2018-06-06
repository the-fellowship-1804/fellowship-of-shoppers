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
router.put('/:id', (req, res, next) => {
  User.update(req.body, {
    where: { id: req.params.id },
    returning: true,
    plain: true
  })
    .then(updatedUser => res.json(updatedUser[1].dataValues))
    .catch(next);
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
