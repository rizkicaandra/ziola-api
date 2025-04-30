import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { FindOneDto } from 'src/core/dtos';

export class UserStatusDto {
  @MaxLength(3)
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class FindUserStatusByCodeDto extends IntersectionType(
  PickType(FindOneDto, ['isNotFound'] as const),
  PickType(UserStatusDto, ['code'] as const),
) {}

export class FindUserStatusQuery extends PickType(FindOneDto, ['isNotFound']) {}

export class FindUserStatusByCodeParam extends PickType(UserStatusDto, [
  'code',
] as const) {}
