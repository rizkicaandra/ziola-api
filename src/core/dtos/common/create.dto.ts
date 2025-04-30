import { IsString, ValidateIf } from 'class-validator';

export class CreateOptionalDto {
  @ValidateIf((value) => value.createdBy)
  @IsString()
  createdBy?: string;
}
