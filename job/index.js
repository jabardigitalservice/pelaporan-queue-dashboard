/* eslint-disable no-console */
const { handlerFailure, handlerCompleted, handlerStalled } = require('./handler')
const { connectQueue } = require('../config')
const { QUEUE } = require('../utils')
const { casesJob } = require('./job')

const cases = connectQueue(QUEUE.CASE)
// const history = connectQueue(QUEUE.HISTORY)
/*
  @description initial all job queue
*/
const initJob = () => {
  console.info('newsQueue job is working!');
  cases.process(casesJob);
  cases.on('failed', handlerFailure);
  cases.on('completed', handlerCompleted);
  cases.on('stalled', handlerStalled);
}

module.exports = { initJob }
