import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerTemplateService } from './mailer-template.service';
import * as nodemailer from 'nodemailer';
import { MailerSendEmailDto } from '../dto';

@Injectable()
export class MailerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerTemplate: MailerTemplateService,
  ) {}

  getTransporter() {
    return nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async sendEmail(payload: MailerSendEmailDto): Promise<boolean> {
    try {
      const transporter = this.getTransporter();
      await transporter.sendMail({
        from: this.configService.get<string>('SMTP_USER'),
        to: payload.emailReciever,
        subject: payload.subject,
        html: this.mailerTemplate[payload.template.type](payload.template),
      });

      return true;
    } catch (error) {
      console.log('error :>> ', error);
      return false;
    }
  }
}
