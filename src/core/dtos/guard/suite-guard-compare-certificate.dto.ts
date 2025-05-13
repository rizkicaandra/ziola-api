import { IsNotEmpty, IsString } from 'class-validator';

export class CompareCertificateSuiteGuardDto {
  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @IsString()
  @IsNotEmpty()
  consumerId: string;
}
