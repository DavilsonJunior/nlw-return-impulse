import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "adad82ac88a049",
    pass: "801d2fa42adc4c"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
     await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Davilson Junior <davilsonjr_jobs@yahoo.com>',
      subject,
      html: body
    });
  }
}