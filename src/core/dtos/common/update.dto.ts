import { IsString, ValidateIf } from 'class-validator';

export class UpdateOptionalDto {
  @ValidateIf((value) => value.updatedBy)
  @IsString()
  updatedBy?: string;
}
