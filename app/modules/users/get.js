const { pick, omit } = require('lodash')
const { User } = require('../../database')
const { JWTModule, CryptoModule, Errors } = require('../../lib')
const { validate } = require('../../middlewares')

const allowedFields = ['email', 'password']
const { UnprocessableEntityError, UnauthorizedError } = Errors

const authenticate = async (req, res, next) => {
  try {
    const payload = pick(req.body, allowedFields)
    const user = await User.findOne({ email: payload.email }).lean()

    if (!user) {
      throw new UnprocessableEntityError('User does not exist.')
    }

    if (user.password !== CryptoModule.hash(payload.password)) {
      throw new UnauthorizedError('Password is invalid.')
    }

    const tokenPayload = {
      id: user._id,
      type: user.type
    }

    const token = await JWTModule.issueToken(tokenPayload)
    const result = {
      user: omit(user, ['password']),
      token: token
    }
    res.status(200).send(result)
  } catch (err) {
    next(err)
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').lean()
    res.status(200).send(users)
  } catch (err) {
    next(err)
  }
}


module.exports = {
  authenticate,
  getUsers
}