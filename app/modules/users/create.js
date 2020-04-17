const { pick, omit } = require('lodash')
const { User } = require('../../database')
const { CryptoModule, JWTModule, Errors } = require('../../lib')
const { validate } = require('../../middlewares')

const { BadRequestError } = Errors
const allowedFields = ['name', 'password', 'email']
const fieldsToOmit = ['password']

const register = async (req, res, next) => {
  const payload = pick(req.body, allowedFields)
  const query = { email: payload.email }

  delete payload.type

  try {
    const count = await User.findOne(query).countDocuments()
    if (count > 0) {
      throw new BadRequestError('Email is already used')
    }

    const user = new User(payload)
    user.password = CryptoModule.hash(payload.password)

    await user.save()

    const tokenPayload = {
      id: user._id,
      type: user.type
    }
    const token = await JWTModule.issueToken(tokenPayload)
    const result = {
      user: omit(user.toObject(), fieldsToOmit),
      token
    }

    res.status(200).send(result)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  register
}
