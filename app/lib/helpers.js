const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/

module.exports = {
  emailRegex,
  passwordRegex
}
