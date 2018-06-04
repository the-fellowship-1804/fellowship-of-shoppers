const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//Get all users
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email'],
  })
    .then(users => res.json(users))
    .catch(next)
})

//Create new user
router.post('/', (req, res, next) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    address: req.body.address,
    paymentInfo: req.body.paymentInfo,
  })
    .then(newUser => res.json(newUser))
    .catch(next)
})

//Get one user
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next)
})

//Update a user's info
router.put('/:id', (req, res, next) => {
  User.update(
    {
      email: req.body.email,
      password: req.body.password,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      address: req.body.address,
      paymentInfo: req.body.paymentInfo,
    },
    {
      where: {id: req.params.id},
      returning: true,
      plain: true,
    }
  )
    .then(updatedUser => res.json(updatedUser[1].dataValues))
    .catch(next)
})

//Update a user's cart
router.put(`/cart/:id`, (req, res, next) => {
  User.update(
    {
      cart: req.body.cart,
    },
    {
      where: {id: req.params.id},
      returning: true,
      plain: true,
    }
  )
    .then(updatedUser => res.json(updatedUser[1].dataValues))
    .catch(next)
})

//Delete a user
router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: req.id,
    },
  })
    .then(res.end())
    .catch(next)
})
