import { MailAdapter, sendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "673de117f6d81f",
    pass: "5efa84d852a802",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: sendMailData) {
    await transport.sendMail({
      from: "Equipe de desenvolvimento <oi@feedget.com>",
      to: "Gustavo <gustavoleon2001@gmail.com",
      subject: data.subject,
      html: data.body,
    });
  }
}
