import Queue from 'bull';
import { RegistrationMail } from '../jobs/RegistrationMail';

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisPass = process.env.REDIS_PASS;

const payload = {
  key: "RegistrationMail",
  options: {
    delay: 5000,
    priority: 3,
  },
};

const queue = new Queue(payload.key, {
  redis: {
    port: redisPort,
    host: redisHost,
    password: redisPass,
  },
});

queue.process(async (job) => {
  const registrationMail = new RegistrationMail();
  await registrationMail.handle(job.data);
});

export const addJob = async (msg) => {
  await queue.add(msg, payload.options);
};