import { IntersectionType, PickType } from '@nestjs/mapped-types';
import {
  UserAccountDto,
  UserAccountOptionalDto,
} from './user-account-base.dto';
import { FindAllDto, FindOneDto, UpdateOptionalDto } from 'src/core/dtos';
import { UserStatusDto } from './user-status-base.dto';
import { UserRoleDto } from './user-role-base.dto';

// create
export class CreateUserAccountDto extends IntersectionType(
  PickType(UserAccountDto, [
    'email',
    'name',
    'applicationCode',
    'userRoleId',
    'phone',
  ] as const),
  PickType(UserAccountOptionalDto, ['createdBy'] as const),
) {}

// find
export class FindUserAccountInternalDto extends IntersectionType(
  PickType(UserAccountOptionalDto, ['email', 'phone'] as const),
  PickType(UserAccountDto, ['applicationCode'] as const),
  PickType(FindOneDto, ['isExist', 'isNotFound'] as const),
) {
  isIncludeRole?: boolean;
}

export class FindUserAccountParam extends PickType(UserAccountDto, [
  'userAccountId',
] as const) {}

export class FindUserAccountQuery extends PickType(FindOneDto, [
  'isNotFound',
  'isShowPassword',
] as const) {}

export class FindUserAccountByIdDto extends IntersectionType(
  PickType(UserAccountDto, ['userAccountId'] as const),
  PickType(FindOneDto, ['isNotFound', 'isShowPassword'] as const),
) {}

export class FindUserAccountDto extends PickType(FindAllDto, [
  'isPagination',
  'page',
  'pageSize',
  'search',
] as const) {}

// update user account dto

export class UpdateUserAccountBodyDto extends PickType(UserAccountDto, [
  'email',
  'name',
  'phone',
] as const) {}

export class UpdateUserAccountByIdDto extends IntersectionType(
  PickType(UserAccountDto, [
    'userAccountId',
    'email',
    'name',
    'phone',
  ] as const),
  PickType(UpdateOptionalDto, ['updatedBy'] as const),
) {}

// update user account status dto

export class UpdateUserAccountStatusBodyDto extends PickType(UserStatusDto, [
  'userStatusCode',
] as const) {}

export class UpdateUserAccountStatusByIdDto extends IntersectionType(
  PickType(UserAccountDto, ['userAccountId'] as const),
  PickType(UserStatusDto, ['userStatusCode'] as const),
  PickType(UpdateOptionalDto, ['updatedBy'] as const),
) {}

// update user account role dto

export class UpdateUserAccountRoleBodyDto extends PickType(UserRoleDto, [
  'userRoleId',
] as const) {}

export class UpdateUserAccountRoleByIdDto extends IntersectionType(
  PickType(UserAccountDto, ['userAccountId', 'userRoleId'] as const),
  PickType(UpdateOptionalDto, ['updatedBy'] as const),
) {}

// update user account password dto

export class UpdateUserAccountPasswordBodyDto extends PickType(UserAccountDto, [
  'currentPassword',
  'newPassword',
]) {}

export class UpdateUserAccountPasswordByIdDto extends IntersectionType(
  PickType(UserAccountDto, [
    'userAccountId',
    'currentPassword',
    'newPassword',
  ] as const),
) {}
