import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { FindOneDto, RequestIdDto } from 'src/core/dtos';
import { ApplicationDto } from './application-base.dto';

export class FindApplicationByCodeDto extends IntersectionType(
  PickType(FindOneDto, ['isNotFound'] as const),
  PickType(ApplicationDto, ['applicationCode'] as const),
  PickType(RequestIdDto, ['requestId'] as const),
) {}

export class FindApplicationQuery extends PickType(FindOneDto, [
  'isNotFound',
]) {}

export class FindApplicationByCodeParam extends PickType(ApplicationDto, [
  'applicationCode',
] as const) {}
