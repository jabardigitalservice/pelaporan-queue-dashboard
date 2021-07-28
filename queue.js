/* eslint-disable import/no-unresolved */
const Queue = require('bee-queue')
require('dotenv').config()

const sharedConfig = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  stallInterval: 5000,
  nearTermWindow: 1200000,
  delayedDebounce: 1000,
  sendEvents: false,
  removeOnSuccess: false,
  isWorker: true,
  activateDelayedJobs: true
}

const queue = new Queue('queue-export-cases', sharedConfig)
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
