import { IsNotEmpty, IsString } from 'class-validator';

export class MailerTemplateNewUserDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;
}
