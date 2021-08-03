/* eslint-disable no-console */
const { jobCaseExport } = require('./export')

const casesJob = async (job, done) => {
  try {
    console.info(`running job cases! with id ${job.id}`)
    await jobCaseExport(job.data.query, job.data.user, job.id)
    done(null, 'succes')
  } catch (error) {
    done(null, error)
  }
}

module.exports = {
  casesJob
}
