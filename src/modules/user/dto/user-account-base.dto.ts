import { PickType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { CreateOptionalDto } from 'src/core/dtos';
import { ApplicationDto } from './application-base.dto';

export class UserAccountDto extends PickType(ApplicationDto, [
  'applicationCode',
] as const) {
  @IsString()
  @IsNotEmpty()
  userAccountId: string;

  @IsEmail({})
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsMobilePhone('id-ID', { strictMode: true })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsInt()
  @IsNotEmpty()
  userRoleId: number;

  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsStrongPassword({ minLength: 6 })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class UserAccountOptionalDto extends PickType(CreateOptionalDto, [
  'createdBy',
] as const) {
  @ValidateIf((value) => value.email)
  @IsEmail({})
  @IsString()
  email?: string;

  @ValidateIf((value) => value.phone)
  @IsMobilePhone('id-ID', { strictMode: true })
  @IsString()
  phone?: string;
}
