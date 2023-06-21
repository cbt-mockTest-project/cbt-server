import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendVerificationEmail(email: string, link: string): boolean;
    sendFindPasswordEmail(email: string, link: string): Promise<boolean>;
    sendCommentNoticeEmail(subject: string, email: string, link: string, title: string): boolean;
}
