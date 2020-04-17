const BadRequestError = require('./bad-request-error')
const UnauthorizedError = require('./unauthorized-error')
const UnprocessableEntityError = require('./unprocessable-entity-error')
const BadPermissionError = require('./bad-permission-error')

module.exports = {
  BadRequestError,
  UnprocessableEntityError,
  UnauthorizedError,
  BadPermissionError
}
