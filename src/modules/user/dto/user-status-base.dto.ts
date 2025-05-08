import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserStatusDto {
  @MaxLength(3)
  @IsString()
  @IsNotEmpty()
  userStatusCode: string;
}
