import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { MailerType } from 'src/core/enums';

class MailerTemplateDto {
  type: MailerType;
  email?: string;
  name?: string;
  password?: string;
}

export class MailerSendEmailDto {
  @IsEmail({})
  @IsString()
  @IsNotEmpty()
  emailReciever: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  template: MailerTemplateDto;
}
