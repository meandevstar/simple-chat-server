const jwt = require('jsonwebtoken')

module.exports = (token) => new Promise((resolve, reject) => {
  const secret = process.env.JWT_SECRET,
    algorithm = process.env.JWT_ALGO

  jwt.verify(token, secret, { algorithm }, (err, tokenParsed) => {
    if (err) {
      reject(err)
    } else {
      resolve(tokenParsed)
    }
  })
})
