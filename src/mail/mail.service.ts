import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  sendVerificationEmail(email: string, link: string) {
    const path = `${__dirname.split('dist')[0]}src/mail/templates`;
    this.mailerService
      .sendMail({
        to: email,
        subject: '[실기CBT] 이메일 인증',
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

  sendFindPasswordEmail(email: string, link: string) {
    const path = `${__dirname.split('dist')[0]}src/mail/templates`;
    this.mailerService
      .sendMail({
        to: email,
        subject: '[실기CBT] 비밀번호 찾기',
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
}
