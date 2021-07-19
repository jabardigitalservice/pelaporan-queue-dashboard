const { customResponse } = require('../utils')

const basicAuth = (req, res, next) => {
  const authheader = req.headers.authorization
  const err = 'You are not authenticated!'
  err.status = 401

  if (!authheader) {
    res.setHeader('WWW-Authenticate', 'Basic')
    customResponse(res, 401, err, [])
  } else {
    // eslint-disable-next-line new-cap
    const auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':')
    const user = auth[0]
    const pass = auth[1]

    if (user === process.env.USERNAME_BASIC && pass === process.env.PASSWORD_BASIC) {
      next()
    } else {
      res.setHeader('WWW-Authenticate', 'Basic')
      customResponse(res, 401, err, [])
    }
  }
}

module.exports = {
  basicAuth
}
