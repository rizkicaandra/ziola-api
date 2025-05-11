import { Module } from '@nestjs/common';
import { MailerService, MailerTemplateService } from './services';

@Module({
  providers: [MailerService, MailerTemplateService],
  exports: [MailerService],
})
export class MailerModule {}
