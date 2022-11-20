import { MailService } from './mail.service';
import { Global, Module } from '@nestjs/common';

@Module({
  providers: [MailService],
  exports: [MailService],
})
@Global()
export class MailModule {}
