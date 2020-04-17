const jwt = require('jsonwebtoken')

module.exports = payload => {
  const secret = process.env.JWT_SECRET,
    expiresIn = process.env.JWT_EXPIRES_IN,
    algorithm = process.env.JWT_ALGO

  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn, algorithm }, (err, token) => {
      if (err) {
        return reject(err)
      }
      resolve(token)
    })
  })
}
