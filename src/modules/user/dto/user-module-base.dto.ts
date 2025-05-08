import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserModuleDto {
  @MaxLength(5)
  @IsString()
  @IsNotEmpty()
  userModuleCode: string;

  @MaxLength(5)
  @IsString()
  @IsNotEmpty()
  userSubmoduleCode: string;
}
