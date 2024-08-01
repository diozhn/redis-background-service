import Queue from 'bull';
import * as jobHandlers from '../jobs';
import queueConfig from '../config/queueConfig';

const queues = queueConfig.queues.map(({ key, options }) => {
  const queue = new Queue(key, {
    redis: queueConfig.redis
  })

  queue.process(async (job) => {
    if (jobHandlers[key]) {
      const jobHandler = new jobHandlers[key]();
      await jobHandler.handle(job.data)
    } else {
      console.error(`No job handler found for key: ${key}`)
    }
  })

  return {
    queue,
    key,
    options
  }
})

export const addJob = async (key, msg) => {
  const queue = queues.find(q => q.key === key);
  if (queue) {
    await queue.queue.add(msg, queue.options)
  } else {
    throw new Error(`No queue found for key: ${key}`)
  }
}