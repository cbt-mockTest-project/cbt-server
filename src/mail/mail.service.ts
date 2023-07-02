import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  sendVerificationEmail(email: string, link: string) {
    const path =
      process.env.NODE_ENV === 'dev'
        ? `${__dirname.split('dist')[0]}src/mail/templates`
        : `${__dirname.split('dist')[0]}dist/mail/templates`;
    this.mailerService
      .sendMail({
        to: email,
        subject: '[모두CBT] 이메일 인증',
        template: path + '/verification', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          link,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
    return true;
  }

  async sendFindPasswordEmail(email: string, link: string) {
    const path =
      process.env.NODE_ENV === 'dev'
        ? `${__dirname.split('dist')[0]}src/mail/templates`
        : `${__dirname.split('dist')[0]}dist/mail/templates`;
    await this.mailerService
      .sendMail({
        to: email,
        subject: '[모두CBT] 비밀번호 찾기',
        template: path + '/findPassword', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          link,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
    return true;
  }

  sendCommentNoticeEmail(
    subject: string,
    email: string,
    link: string,
    title: string,
  ) {
    const path =
      process.env.NODE_ENV === 'dev'
        ? `${__dirname.split('dist')[0]}src/mail/templates`
        : `${__dirname.split('dist')[0]}dist/mail/templates`;
    this.mailerService
      .sendMail({
        to: email,
        subject: `[모두CBT] ${subject}`,
        template: path + '/commentNotice', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          link,
          title,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
    return true;
  }
}
