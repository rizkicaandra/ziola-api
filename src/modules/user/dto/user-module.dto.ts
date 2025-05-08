import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { FindOneDto } from 'src/core/dtos';
import { UserModuleDto } from './user-module-base.dto';

export class FindUserModuleByCodeDto extends IntersectionType(
  PickType(UserModuleDto, ['userModuleCode'] as const),
  PickType(FindOneDto, ['isNotFound'] as const),
) {}

export class FindUserModuleQuery extends PickType(FindOneDto, [
  'isNotFound',
] as const) {}

export class FindUserModuleByCodeParam extends PickType(UserModuleDto, [
  'userModuleCode',
] as const) {}
