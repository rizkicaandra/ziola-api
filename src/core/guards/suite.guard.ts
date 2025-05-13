import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtHelper, CryptoHelper } from '../helpers';
import { ResponseGeneratorService } from '../responses';
import { AppErrorCode } from '../enums';
import { CommonUtils } from '../utils';
import { JwtTokenPayload } from '../types';
import { CompareCertificateSuiteGuardDto } from '../dtos';
import { validateOrReject } from 'class-validator';
import { AuthService } from 'src/modules/auth';

@Injectable()
export class SuiteGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly response: ResponseGeneratorService,
    private readonly cryptoHelper: CryptoHelper,
    private readonly jwtHelper: JwtHelper,
    private readonly commonUtils: CommonUtils,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const certificate = await this.compareCertificate(request);

    if (!token || !certificate) {
      throw this.response.unauthorized(AppErrorCode.USER_AUTH_ACCESS_DENIED);
    }

    try {
      let payload = this.jwtHelper.verifyToken(token);
      let userAccountToken: string = '';
      if (typeof payload === 'object' && payload?.userAccount !== undefined)
        userAccountToken = payload.userAccount;

      let decryptedJwtPayload: JwtTokenPayload = JSON.parse(
        this.cryptoHelper.decryptAesGcm(userAccountToken),
      );

      // authentication process
      const userAccount = await this.authService.validateUser({
        applicationCode: decryptedJwtPayload?.applicationCode,
        email: decryptedJwtPayload?.email,
      });

      if (!userAccount) {
        throw this.response.unauthorized(AppErrorCode.USER_AUTH_ACCESS_DENIED);
      }

      request['userAccount'] = userAccount;
    } catch (error) {
      console.log('suite guard error :>> ', JSON.stringify(error));
      throw this.response.unauthorized(AppErrorCode.USER_AUTH_ACCESS_DENIED);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async compareCertificate(request: Request): Promise<boolean> {
    try {
      const timestamp: any = request.headers.timestamp;
      const consumerId: any = request.headers?.['consumer-id'];
      const consumerCertificate = request.headers?.certificate;

      const headers = new CompareCertificateSuiteGuardDto();
      headers.timestamp = timestamp;
      headers.consumerId = consumerId;
      await validateOrReject(headers);

      const isEpoch = this.commonUtils.isEpoch(+headers.timestamp);

      if (!isEpoch)
        throw this.response.validationPipe(['Timestamp should be epoch']);

      const hmacCertificate =
        timestamp +
        '~' +
        this.configService.get<string>('API_KEY') +
        '~' +
        consumerId;
      const hmacCertificateBase64 =
        Buffer.from(hmacCertificate).toString('base64');
      const encrypted = this.cryptoHelper.decryptHmacSha256(
        hmacCertificateBase64,
      );

      return encrypted === consumerCertificate;
    } catch (error) {
      console.log('error compare certificate :>> ', JSON.stringify(error));
      return false;
    }
  }
}
