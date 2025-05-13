import { PickType } from '@nestjs/mapped-types';
import { UserAccountDto } from 'src/modules/user';

export class SignInDto extends PickType(UserAccountDto, [
  'email',
  'password',
  'applicationCode',
] as const) {}

export class ValidateUserAuthenticationDto extends PickType(UserAccountDto, [
  'email',
  'applicationCode',
] as const) {}
