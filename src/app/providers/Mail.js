import nodemailer from 'nodemailer'

export class Mail {
  async handle(params) {

    const { from, to, subject, html } = params

    const transport = nodemailer.createTransport(
      {
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS
        }
      }
    )

    await transport.sendMail({
      from,
      to,
      subject,
      html
    })
  }
}