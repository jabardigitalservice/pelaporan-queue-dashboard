/* eslint-disable no-console */
require('dotenv').config()
const mongoose = require('mongoose')

const dbUrl = process.env.MONGO_URL

mongoose.Promise = global.Promise

const connectWithRetry = () => mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  keepAlive: true,
  auto_reconnect: true,
  poolSize: 10,
}, (err) => {
  if (err) {
    const msg = `Failed to connect to mongo on startup - retrying in 5 sec ${err}`
    if (process.env.NODE_ENV === 'development') {
      console.error(msg)
    } else {
      console.info(msg)
    }
    setTimeout(connectWithRetry(), 5000)
  } else {
    console.info('mongoDB Connected ✅')
  }
})

mongoose.connection.on('disconnected', (err) => {
  console.info(`Lost MongoDB connection ${err}`)
})

mongoose.connection.on('reconnected', (err) => {
  console.info(`Reconnected to MongoDB ${err}`)
})

if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.info(`${collectionName}.${method}`, JSON.stringify(query), doc);
  });
}

module.exports = {
  connectWithRetry
}
