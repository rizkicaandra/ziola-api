import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { CommonUtils } from 'src/core/utils';

export class FindAllDto {
  @Transform(({ value }) => {
    return new CommonUtils().transformBoolean(value);
  })
  @IsBoolean()
  isPagination: boolean;

  @ValidateIf((value) => value.isPagination)
  @Transform(({ value }) => {
    return +value;
  })
  @Min(1)
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ValidateIf((value) => value.isPagination)
  @Transform(({ value }) => {
    return +value;
  })
  @Max(100)
  @Min(5)
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  pageSize: number;

  @IsOptional()
  @IsString()
  search: string;
}
