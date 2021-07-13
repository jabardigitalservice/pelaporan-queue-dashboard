const Queue = require('bee-queue')

const sharedConfig = {
  redis: {
    host: 'redis-dashboard',
    port: 6379,
  },
  sendEvents: false,
  removeOnSuccess: false,
  activateDelayedJobs: true,
};

const queue = new Queue('my-awesome-queue', sharedConfig)
const test = () => {
  queue.createJob({ asem: 'jawa' })
    .retries(10)
    .save()

  queue.process((job, done) => {
    job.reportProgress({ page: 3, totalPages: 11 });
    return done(null, { a: 'hello' })
  })
}

test()
