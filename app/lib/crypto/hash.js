const crypto = require('crypto')

module.exports = text => {
  if (!text) return new Error('Please provide text.')

  const algorithm = process.env.ENC_ALGO
  const salt = process.env.ENC_SALT
  
  hmac = crypto.createHmac(algorithm, salt)
  hmac.update(text)

  return hmac.digest('hex')
}
