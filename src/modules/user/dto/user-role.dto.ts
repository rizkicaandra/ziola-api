import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { UserRoleDto, UserRoleOptionalDto } from './user-role-base.dto';
import { FindAllDto, FindOneDto } from 'src/core/dtos';
import { Prisma } from '@prisma/client';

export class CreateUserRoleDto extends PickType(UserRoleDto, [
  'userRoleCode',
  'name',
  'applicationCode',
  'userPermissions',
]) {}

export class UpdateUserRoleBodyDto extends PickType(UserRoleOptionalDto, [
  'userRoleCode',
  'name',
  'userPermissions',
]) {}

export class UpdateUserRoleDto extends IntersectionType(
  PickType(UserRoleDto, ['userRoleId'] as const),
  UpdateUserRoleBodyDto,
) {}

export class FindUserRoleDto extends PickType(FindAllDto, [
  'isPagination',
  'page',
  'pageSize',
  'search',
] as const) {}

export class FindUserRoleByIdDto extends IntersectionType(
  PickType(FindOneDto, ['isExist', 'isNotFound'] as const),
  PickType(UserRoleDto, ['userRoleId'] as const),
) {}

export class FindUserRoleByIdParam extends PickType(UserRoleDto, [
  'userRoleId' as const,
]) {}

export class FindUserRoleByIdQuery extends PickType(FindOneDto, [
  'isNotFound',
] as const) {}

export class FindUserRoleInternalDto extends PickType(FindOneDto, [
  'isNotFound',
  'isExist',
] as const) {
  select?: Prisma.UserRoleSelect;
  where: Prisma.UserRoleWhereInput;
}
