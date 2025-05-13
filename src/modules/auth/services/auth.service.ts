import { Injectable } from '@nestjs/common';
import { SignInDto, ValidateUserAuthenticationDto } from '../dto';
import { BcryptHelper, CryptoHelper, JwtHelper } from 'src/core/helpers';
import { ResponseGeneratorService } from 'src/core/responses';
import { AppErrorCode } from 'src/core/enums';
import { PrismaService } from 'prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptHelper: BcryptHelper,
    private readonly cryptoHelper: CryptoHelper,
    private readonly response: ResponseGeneratorService,
    private readonly jwtHelper: JwtHelper,
    private readonly prisma: PrismaService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const userAccount = await this.prisma.userAccount.findFirst({
      where: {
        applicationCode: signInDto.applicationCode,
        email: signInDto.email,
      },
    });

    const decryptedPassword = this.cryptoHelper.decryptAesGcm(
      signInDto.password,
    );
    if (!userAccount || decryptedPassword === undefined)
      throw this.response.badRequest(AppErrorCode.USER_AUTH_SIGNIN_DENIED);

    const comparedPass = await this.bcryptHelper.compare(
      decryptedPassword,
      userAccount.password,
    );
    if (!comparedPass)
      throw this.response.badRequest(AppErrorCode.USER_AUTH_SIGNIN_DENIED);

    const expiredOneHourToken = 60 * 60;
    const expiredSixMonth = expiredOneHourToken * 24 * 30 * 6;

    const encryptedTokenPayload = this.cryptoHelper.encryptAesGcm({
      userAccountId: userAccount.id,
      email: userAccount.email,
      applicationCode: userAccount.applicationCode,
    });

    const encryptedRefreshTokenPayload = this.cryptoHelper.encryptAesGcm({
      userAccountId: userAccount.id,
    });

    const token = this.jwtHelper.generateToken(
      {
        userAccount: encryptedTokenPayload,
      },
      expiredOneHourToken,
    );

    const refreshToken = this.jwtHelper.generateToken(
      {
        userAccount: encryptedRefreshTokenPayload,
      },
      expiredSixMonth,
    );

    return {
      token,
      refreshToken,
    };
  }

  async validateUser(validateUserDto: ValidateUserAuthenticationDto) {
    const userAccount = await this.prisma.userAccount.findFirst({
      select: {
        id: true,
        email: true,
        name: true,
        applicationCode: true,
        status: true,
        userRole: {
          include: {
            userPermissions: true,
          },
        },
      },
      where: {
        applicationCode: validateUserDto.applicationCode,
        email: validateUserDto.email,
      },
    });

    return userAccount;
  }
}
