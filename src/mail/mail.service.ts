import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as aws from '@aws-sdk/client-ses';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter;
  constructor(private readonly mailerService: MailerService) {
    const ses = new aws.SES({
      apiVersion: '2010-12-01',
      region: 'ap-northeast-1',
      credentials: {
        accessKeyId: process.env.AWS_SES_ACCESSKEY,
        secretAccessKey: process.env.AWS_SES_SECRETKEY,
      },
    });
    this.transporter = nodemailer.createTransport({
      SES: { ses, aws },
    });
  }

  async requestMailTransport({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    return this.transporter
      .sendMail({
        from: 'moducbt@gmail.com', // 발신 이메일
        to, // 수신 이메일
        subject, // 제목
        html, // 본문
      })
      .then((res) => {
        console.log('성공');
        return {
          ok: true,
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          ok: false,
        };
      });
  }

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
        return {
          ok: false,
          error: '메일을 보낼 수 없습니다.',
        };
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
        template: path + '/findPassword',
        context: {
          link,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
        return {
          ok: false,
          error: '메일을 보낼 수 없습니다.',
        };
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
        return {
          ok: false,
          error: '메일을 보낼 수 없습니다.',
        };
      });
    return true;
  }
}
