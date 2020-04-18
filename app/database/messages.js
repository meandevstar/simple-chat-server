const { Schema, Types } = require('mongoose')
const { Helpers } = require('../lib')

const messageDefinition = {
  sender: {
    type: Types.ObjectId,
    ref: 'Users'
  },

  text: {
    type: String,
  },

  timestamp: {
    type: Date,
    default: Date.now()
  }
}

const messageSchema = new Schema(messageDefinition, { versionKey: false })

module.exports = messageSchema