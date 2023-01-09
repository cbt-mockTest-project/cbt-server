import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendVerificationEmail(email: string, link: string): boolean;
    sendFindPasswordEmail(email: string, link: string): boolean;
}
