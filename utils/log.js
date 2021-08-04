/* eslint-disable no-console */
const LogQueue = require('../database/models/LogQueue')
const { dynamicColumnCreate } = require('./custom')

const createLogJob = async (progress, jobId, jobName, queueName, query, user) => {
  const body = {
    job_id: jobId,
    job_name: jobName,
    job_status: 'Progress',
    job_progress: progress,
    queue_name: queueName,
    author: user.id,
    email: query.email,
    file_name: query.file_name || null,
    path: query.path || null,
  }
  try {
    return await LogQueue.create(body)
  } catch (error) {
    return error
  }
}

const updateLogJob = async (jobId, param) => {
  try {
    // eslint-disable-next-line no-sequences
    return await LogQueue.findOneAndUpdate({ job_id: jobId }, param), { lean: true };
  } catch (error) {
    return error
  }
}

const createHistoryEmail = async (payload, jobId) => {
  payload.sendAt = Date.now()
  const column = ['email', 'sendAt', 'message', 'status']
  try {
    payload.status = 'Sent'
    payload.message = null
    const addToSet = {
      history: dynamicColumnCreate(column, payload)
    }
    return await LogQueue.updateOne(
      { job_id: jobId }, { $addToSet: addToSet }, { new: true }
    )
  } catch (error) {
    console.info(error)
    return error
  }
}

const createLogStatus = async (jobId, set) => {
  try {
    return await LogQueue.updateOne(
      { job_id: jobId }, { $set: set }, { new: true }
    )
  } catch (error) {
    console.info(error)
    return error
  }
}

module.exports = {
  createLogJob, updateLogJob, createHistoryEmail, createLogStatus
}
