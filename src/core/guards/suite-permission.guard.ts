import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators';
import { RolePermissionsGuard } from '../interfaces';
import { UserPermission } from '@prisma/client';
import { ResponseGeneratorService } from '../responses';
import { AppErrorCode } from '../enums';

@Injectable()
export class SuitePermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly response: ResponseGeneratorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const forbidden = this.response.forbidden(
      AppErrorCode.USER_AUTH_PERMISSION_DENIED,
    );
    try {
      const requiredPermissions = this.reflector.getAllAndOverride<
        RolePermissionsGuard[]
      >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

      if (!requiredPermissions) return true;

      const request = context.switchToHttp().getRequest();
      const userPermissions: UserPermission[] =
        request?.userAccount?.userRole?.userPermissions ?? [];

      if (!request) throw forbidden;
      if (!userPermissions.length) throw forbidden;

      const isSubModuleAndActionMatched = requiredPermissions.every(
        (requiredPermission) => {
          const keysRequiredPermission = Object.keys(requiredPermission.action);
          return userPermissions.some((userPermission) => {
            const isActionExist = keysRequiredPermission.every(
              (key) =>
                requiredPermission.action[key] === userPermission.action?.[key],
            );
            return (
              requiredPermission.userSubmoduleCode ===
                userPermission.userSubmoduleCode && isActionExist
            );
          });
        },
      );

      if (!isSubModuleAndActionMatched) throw forbidden;

      return true;
    } catch (error) {
      console.log('error check permissions :>> ', JSON.stringify(error));
      throw forbidden;
    }
  }
}
