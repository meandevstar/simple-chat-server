  
const mongoose = require('mongoose')
const Types = mongoose.Schema.Types

const { userSchema, userTypes } = require('./users')
const conn = mongoose.connection

const user = {
  schema: userSchema,
  types: userTypes,
  User: conn.model('Users', userSchema, 'users')
}

module.exports = {
  user,
  Types
}