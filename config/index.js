/* eslint-disable global-require */
module.exports = {
  ...require('./redis'),
  ...require('./db')
}
