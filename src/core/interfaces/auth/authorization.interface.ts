import { UserPermissionActionDto } from 'src/modules/user';

export type RolePermissionsGuard = {
  userSubmoduleCode: string;
  action: UserPermissionActionDto;
};
