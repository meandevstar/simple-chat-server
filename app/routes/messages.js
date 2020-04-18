const Joi = require('joi')
const router = require('express').Router()
const { messages } = require('../modules')


router.get('/v1/messages', messages.getMessages);


module.exports = router;