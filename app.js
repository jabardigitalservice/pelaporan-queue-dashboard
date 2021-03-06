const express = require('express')

const app = express()
const cors = require('cors')
const compress = require('compression')
const methodOverride = require('method-override')
const xss = require('xss-clean')
const morgan = require('morgan')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const { notFoundHandler, errorHandler } = require('./utils/exceptions')
const { arena, basicAuth } = require('./middleware')
const { MORGAN_FORMAT } = require('./utils/constant')
const { connectWithRetry } = require('./config')
const routing = require('./routes')
require('dotenv').config()

app.use(compress()) // gzip compression
app.use(methodOverride()) // lets you use HTTP verbs
// secure apps by setting various HTTP headers
app.use(cors()) // enable cors
app.options('*', cors()) // cors setup
app.use(express.json({ limit: '200kb' })) // json limit
if (process.env.NODE_ENV !== 'test') {
  connectWithRetry() // connect to mongodb
}
const morganFormat = MORGAN_FORMAT
app.use(morgan(morganFormat, { stream: process.stderr }))
// remove favicon
app.get('/favicon.ico', (_req, res) => {
  res.status(204)
  res.end()
})
app.use(xss()) // handler xss attack

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({
      // to trace all requests to the default router
      app
      // alternatively, you can specify the routes you want to trace:
      // router: someRouter,
    })
  ],
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: Number(process.env.SENTRY_TRACE_RATE)
})
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
if (process.env.NODE_ENV !== 'test') {
  app.use(Sentry.Handlers.requestHandler());
}
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())
// the rest of your app
app.use(Sentry.Handlers.errorHandler())

app.use('/dashboard', basicAuth, arena)
app.use(routing) // routing
app.use(notFoundHandler) // 404 handler
app.use(errorHandler) // error handlerr

module.exports = app
