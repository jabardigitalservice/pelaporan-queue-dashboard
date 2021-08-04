/* eslint-disable no-console */
const { handlerFailure, handlerCompleted, handlerStalled } = require('./handler')
const { connectQueue } = require('../config')
const { QUEUE } = require('../utils')
const { casesJob, historiesJob } = require('./job')

const cases = connectQueue(QUEUE.CASE)
const history = connectQueue(QUEUE.HISTORY)
/*
  @description initial all job queue
*/
const initJob = () => {
  console.info('CasesQueueExport job is working!');
  cases.process(casesJob);
  cases.on('failed', handlerFailure);
  cases.on('completed', handlerCompleted);
  cases.on('stalled', handlerStalled);

  console.info('HistoriesQueueExport job is working!');
  history.process(historiesJob);
  history.on('failed', handlerFailure);
  history.on('completed', handlerCompleted);
  history.on('stalled', handlerStalled);
}

module.exports = { initJob }
