/* eslint-disable global-require */
const express = require('express')
const { customResponse } = require('../utils/exceptions')

const router = express.Router()

router.get('/', (req, res) => {
  customResponse(res, 200, 'Api running', {
    welcome: 'Welcome to queue dashboard pelaporan.',
    uptime: require('os').uptime(),
    loadavg: require('os').loadavg(),
  })
})
module.exports = router
