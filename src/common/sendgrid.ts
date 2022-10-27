import { MailService } from '@sendgrid/mail';
import { BadRequestException } from '@src/errors/exceptions/bad-request.exception';
import config from 'config';

const sgMail = new MailService();
sgMail.setApiKey(config.get<string>('sendgrid.apiKey'));

export interface ISendgridMail {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail(msg: ISendgridMail) {
  const { to, from, subject, text, html } = msg;
  const response = await sgMail
    .send({
      to,
      from,
      subject,
      text,
      html,
    })
    .catch((err) => {
      throw new BadRequestException(err);
    });
  return response?.[0];
}
