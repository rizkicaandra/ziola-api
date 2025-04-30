import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { FindOneDto, RequestIdDto } from 'src/core/dtos';

export class ApplicationDto {
  @MaxLength(3)
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class FindApplicationByCodeDto extends IntersectionType(
  PickType(FindOneDto, ['isNotFound'] as const),
  PickType(ApplicationDto, ['code'] as const),
  PickType(RequestIdDto, ['requestId'] as const),
) {}

export class FindApplicationQuery extends PickType(FindOneDto, [
  'isNotFound',
]) {}

export class FindApplicationByCodeParam extends PickType(ApplicationDto, [
  'code',
] as const) {}
