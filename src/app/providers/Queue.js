import Queue from 'bull'
import * as jobs from '../jobs'
import { RegistrationMail } from '../jobs';
const redisHost = process.env.REDIS_HOST
const redisPort = process.env.REDIS_PORT

const payload = {
  key: "RegistrationMail",
  options: {
    delay: 5000,
    priority: 3,
  },
};

const queue = {
  bull: new Queue(payload.key, { }),
  name: payload.key,
  handle: new RegistrationMail().handle()
}