class BadPermissionError extends Error {
  constructor(message = "You don't have permission.", details = []) {
    super(message, details)
    this.name = 'BadPermissionError'
    this.message = message
    this.details = details
    this.statusCode = 403
  }
}

module.exports = BadPermissionError
