module.exports = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS
  },
  queues: [
    {
      key: "RegistrationMail",
      options: {
        delay: 5000,
        priority: 3
      }
    }
  ]
}