const crypto = require('crypto')

module.exports = (text, hash) => {
  if (!text) {
    return new Error('Please provide text to compare.')
  }
  if (!hash) {
    return new Error('Please provide hash to compare with.')
  }

  const algorithm = process.env.ENC_ALGO
  const salt = process.env.ENC_SALT
    
  hmac = crypto.createHmac(algorithm, salt)
  hmac.update(text)

  const newHash = hmac.digest('hex')

  return newHash === hash
}
