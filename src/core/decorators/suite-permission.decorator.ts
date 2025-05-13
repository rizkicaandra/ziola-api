import { SetMetadata } from '@nestjs/common';
import { RolePermissionsGuard } from '../interfaces';

export const PERMISSIONS_KEY = 'permissions';
export const RequireSuitePermissions = (...permissions: RolePermissionsGuard[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
