class BadRequestError extends Error {
  constructor(message = 'Bad Request', details = []) {
    super(message, details)
    this.name = 'BadRequestError'
    this.message = message
    this.details = details
    this.statusCode = 400
  }
}

module.exports = BadRequestError
