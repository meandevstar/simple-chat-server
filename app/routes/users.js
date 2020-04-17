const Joi = require('joi')
const router = require('express').Router()
const { users } = require('../modules')
const { Helpers } = require('../lib')

const loginSchema = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .regex(Helpers.passwordRegex)
    .required()
}
const registerSchema = {
  name: Joi.string().required(),
  password: Joi.string()
    .regex(Helpers.passwordRegex)
    .required(),
  email: Joi.string()
    .email()
    .required()
}

router.post('/v1/users/authenticate', users.authenticate);
router.post('/v1/users/register', users.register);
router.get('/v1/users', users.getUsers);


module.exports = router;