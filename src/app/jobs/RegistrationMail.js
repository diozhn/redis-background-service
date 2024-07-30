import { Mail } from "../providers/Mail";

export class RegistrationMail {
  async handle(data) {

    const { name, email } = data;

    await new Mail().handle({
      from: "contato.diogomendes@gmail.com",
      to: email,
      subject: "Email test from user register",
      html: `Test ${name}`,
    });
  }
}
