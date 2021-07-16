/* eslint-disable import/no-unresolved */
const Queue = require('bee-queue')
require('dotenv').config()

const sharedConfig = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  sendEvents: false,
  removeOnSuccess: false,
  activateDelayedJobs: true
}

const queue = new Queue('my-awesome-queue', sharedConfig)
const test = () => {
  queue.createJob({ province: 'jawa barat' })
    .retries(10)
    .save()

  queue.process((job, done) => {
    job.reportProgress({ page: 3, totalPages: 11 });
    return done(null, { a: 'hello' })
  })
}

test()
