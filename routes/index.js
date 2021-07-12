const express = require('express')

const routing = express()
const index = require('./documentationRoutes')

routing.use(index)
module.exports = routing
