import { Module } from '@nestjs/common';
import {
  ApplicationController,
  UserModuleController,
  UserRoleController,
  UserStatusController,
} from './controllers';
import {
  ApplicationService,
  UserModuleService,
  UserRoleService,
  UserStatusService,
} from './services';
import { PrismaModule } from 'prisma';
import { CoreModule } from 'src/core';

// create module user
@Module({
  imports: [PrismaModule, CoreModule],
  controllers: [
    UserStatusController,
    ApplicationController,
    UserModuleController,
    UserRoleController,
  ],
  providers: [
    UserStatusService,
    ApplicationService,
    UserModuleService,
    UserRoleService,
  ],
  exports: [],
})
export class UserModule {}
