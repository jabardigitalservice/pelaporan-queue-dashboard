/* eslint-disable global-require */
module.exports = {
  ...require('./redis'),
  ...require('./email'),
  ...require('./aws'),
  ...require('./db')
}
