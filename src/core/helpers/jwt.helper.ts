import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { ResponseGeneratorService } from '../responses';
import { AppErrorCode } from '../enums';

@Injectable()
export class JwtHelper {
  constructor(
    private readonly configService: ConfigService,
    private readonly response: ResponseGeneratorService,
  ) {}

  generateToken(payload: object, expiresIn: number) {
    const jwtKey = this.configService.get<string>('JWT_KEY');
    if (jwtKey === undefined) {
      throw this.response.badRequest(AppErrorCode.CONFIGURATION_ERROR);
    }
    return jwt.sign(payload, jwtKey, {
      expiresIn,
    });
  }

  verifyToken(token: string) {
    const jwtKey = this.configService.get<string>('JWT_KEY');
    if (jwtKey === undefined) {
      throw this.response.badRequest(AppErrorCode.CONFIGURATION_ERROR);
    }
    return jwt.verify(token, jwtKey);
  }
}
