const jwt = require('jsonwebtoken')
const { JWTModule } = require('../lib')

module.exports = async (req, res, next) => {
  const accessToken = (req.get('Authorization') || '').replace('Bearer ', '')

  if (!accessToken) {
    return next(new UnauthorizedError('Token is missing'))
  }

  try {
    const token = await JWTModule.verifyToken(accessToken)
    req.token = {
      raw: accessToken,
      payload: token
    }
    next()
  } catch (err) {
    err.statusCode = 401
    next(err)
  }
}
