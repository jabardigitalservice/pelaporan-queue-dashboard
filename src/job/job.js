/* eslint-disable no-console */
const { jobCaseExport, jobHistoryExport } = require('./export')

const casesJob = async (job, done) => {
  try {
    console.info(`running job cases! with id ${job.id}`)
    await jobCaseExport(job)
    done(null, 'succes')
  } catch (error) {
    done(null, error)
  }
}

const historiesJob = async (job, done) => {
  try {
    console.info(`running job histories! with id ${job.id}`)
    await jobHistoryExport(job)
    done(null, 'succes')
  } catch (error) {
    done(null, error)
  }
}

module.exports = {
  casesJob, historiesJob
}
