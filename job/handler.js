/* eslint-disable no-console */
const handlerCompleted = (job) => {
  console.info(
    `Job in ${job.queue.name} completed for: ${job.id}`
  );
  job.remove();
};

// eslint-disable-next-line consistent-return
const handlerFailure = (job, err) => {
  if (job.attemptsMade >= job.opts.attempts) {
    console.info(
      `Job failures above threshold in ${job.queue.name} for: ${job.id}`,
      err
    );
    return null;
  }
  console.info(
    `Job in ${job.queue.name} failed for: ${job.id} with ${err.message
    }. ${job.opts.attempts - job.attemptsMade} attempts left`
  );
};

const handlerStalled = (job) => {
  console.info(
    `Job in ${job.queue.name} stalled for: ${job.id}`
  );
};

module.exports = {
  handlerCompleted, handlerFailure, handlerStalled
}
