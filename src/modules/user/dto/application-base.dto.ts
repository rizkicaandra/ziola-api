import { IsNotEmpty, IsString, MaxLength, ValidateIf } from 'class-validator';

export class ApplicationDto {
  @MaxLength(3)
  @IsString()
  @IsNotEmpty()
  applicationCode: string;
}

export class ApplicationOptionalDto {
  @ValidateIf((v) => v.applicationCode)
  @MaxLength(3)
  @IsString()
  applicationCode?: string;
}
