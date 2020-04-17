const { Schema } = require('mongoose')
const timestamps = require('mongoose-timestamp')
const { Helpers } = require('../lib')

const userTypes = ['ADMIN', 'MASTER', 'USER']

const userDefinition = {
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    match: Helpers.emailRegex,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
}

const userSchema = new Schema(userDefinition, { versionKey: false })
userSchema.plugin(timestamps)

module.exports = {
  userSchema,
  userTypes
}