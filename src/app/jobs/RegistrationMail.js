import fs from 'fs';
import path from 'path'
import { Mail } from "../providers/Mail";

export class RegistrationMail {
  async handle(data) {

    const { name, email, password } = data;

    const templatePath = path.join(__dirname, 'templates', 'RegistrationMail.html')
    let htmlContent = fs.readFileSync(templatePath, 'utf8')

    htmlContent = htmlContent
    .replace('{{name}}', name)
    .replace('{{email}}', email)
    .replace('{{password}}', password)
    .replace('{{year}}', new Date().getFullYear());

    await new Mail().handle({
      from: process.env.MAIL_FROM,
      to: email,
      subject: `Email test from user register`,
      html: htmlContent,
    });
  }
}
