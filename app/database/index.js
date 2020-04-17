  
const mongoose = require('mongoose')
const Types = mongoose.Schema.Types

const userSchema = require('./users')
const conn = mongoose.connection

module.exports = {
  User: conn.model('Users', userSchema, 'users'),
  Types
}