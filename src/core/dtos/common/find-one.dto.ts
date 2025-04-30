import { Transform } from 'class-transformer';
import { IsBoolean, ValidateIf } from 'class-validator';
import { CommonUtils } from 'src/core/utils';

export class FindOneDto {
  @ValidateIf((value) => value.isNotFound)
  @Transform(({ value }) => {
    return new CommonUtils().transformBoolean(value);
  })
  @IsBoolean()
  isNotFound?: boolean = true;

  @ValidateIf((value) => value.isExist)
  @Transform(({ value }) => {
    return new CommonUtils().transformBoolean(value);
  })
  @IsBoolean()
  isExist?: boolean;

  @ValidateIf((value) => value.isShowPassword)
  @Transform(({ value }) => {
    return new CommonUtils().transformBoolean(value);
  })
  @IsBoolean()
  isShowPassword?: boolean;
}
