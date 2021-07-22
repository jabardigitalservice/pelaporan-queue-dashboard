const { customResponse } = require('../utils')

const authenticatedBasic = (autheader, next, res, err) => {
  // eslint-disable-next-line new-cap
  const auth = new Buffer.from(autheader.split(' ')[1], 'base64').toString().split(':')
  const user = auth[0]
  const pass = auth[1]

  if (user === process.env.USERNAME_BASIC && pass === process.env.PASSWORD_BASIC) {
    next()
  } else {
    res.setHeader('WWW-Authenticate', 'Basic')
    customResponse(res, 401, err, [])
  }
}
const basicAuth = (req, res, next) => {
  const autheader = req.headers?.authorization || false
  const err = 'You are not authenticated!'
  err.status = 401

  if (!autheader) {
    res.setHeader('WWW-Authenticate', 'Basic')
    customResponse(res, 401, err, [])
  } else {
    authenticatedBasic(autheader, next, res, 'authenticated error')
  }
}

module.exports = {
  basicAuth
}
