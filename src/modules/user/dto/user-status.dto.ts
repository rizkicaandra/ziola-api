import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { FindOneDto } from 'src/core/dtos';
import { UserStatusDto } from './user-status-base.dto';

export class FindUserStatusByCodeDto extends IntersectionType(
  PickType(FindOneDto, ['isNotFound'] as const),
  PickType(UserStatusDto, ['userStatusCode'] as const),
) {}

export class FindUserStatusQuery extends PickType(FindOneDto, ['isNotFound']) {}

export class FindUserStatusByCodeParam extends PickType(UserStatusDto, [
  'userStatusCode',
] as const) {}
