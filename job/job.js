/* eslint-disable no-console */
const { jobCaseExport } = require('./export')

const casesJob = async (job, done) => {
  try {
    console.info(`running job cases! with id ${job.id}`)
    await jobCaseExport(job)
    done(null, 'succes')
  } catch (error) {
    done(null, error)
  }
}

module.exports = {
  casesJob
}
