import { PickType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { UserModuleDto } from './user-module-base.dto';
import { ApplicationDto, ApplicationOptionalDto } from './application-base.dto';

export class UserPermissionActionDto {
  @IsOptional()
  read?: boolean;

  @IsOptional()
  create?: boolean;

  @IsOptional()
  update?: boolean;

  @IsOptional()
  delete?: boolean;
}

export class UserRolePermissionDto extends PickType(UserModuleDto, [
  'userModuleCode',
  'userSubmoduleCode',
] as const) {
  @ValidateIf((value) => value.userPermissionId)
  @IsInt()
  userPermissionId: number;

  @ValidateNested({
    each: true,
  })
  @Type(() => UserPermissionActionDto)
  @IsNotEmpty()
  action: UserPermissionActionDto;
}

export class UserRoleDto extends PickType(ApplicationDto, [
  'applicationCode',
] as const) {
  @Transform(({ value }) => +value)
  @IsInt()
  @IsNotEmpty()
  userRoleId: number;

  @Transform(({ value }) => value.toUpperCase())
  @MaxLength(5)
  @IsString()
  @IsNotEmpty()
  userRoleCode: string;

  @Transform(({ value }) => value.toUpperCase())
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => UserRolePermissionDto)
  @IsNotEmpty()
  userPermissions: UserRolePermissionDto[];
}

export class UserRoleOptionalDto extends PickType(ApplicationOptionalDto, [
  'applicationCode',
] as const) {
  @ValidateIf((value) => value.userRoleCode)
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.toUpperCase();
    else return value;
  })
  @MaxLength(5)
  @IsString()
  userRoleCode: string;

  @ValidateIf((value) => value.name)
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.toUpperCase();
    else return value;
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((value) => value.userPermissions.length)
  @ValidateNested({ each: true })
  @Type(() => UserRolePermissionDto)
  @IsNotEmpty()
  userPermissions: UserRolePermissionDto[];
}
