  
const mongoose = require('mongoose')
const Types = mongoose.Schema.Types

const userSchema = require('./users')
const messageSchema = require('./messages')
const conn = mongoose.connection

module.exports = {
  User: conn.model('Users', userSchema, 'users'),
  Message: conn.model('Mesages', messageSchema, 'mesasges'),
  Types
}