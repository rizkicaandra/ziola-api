import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { FindOneDto } from 'src/core/dtos';

export class UserModuleDto {
  @MaxLength(3)
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class FindUserModuleByCodeDto extends IntersectionType(
  PickType(UserModuleDto, ['code'] as const),
  PickType(FindOneDto, ['isNotFound'] as const),
) {}

export class FindUserModuleQuery extends PickType(FindOneDto, [
  'isNotFound',
] as const) {}

export class FindUserModuleByCodeParam extends PickType(UserModuleDto, [
  'code',
] as const) {}
