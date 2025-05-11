import { Module } from '@nestjs/common';
import {
  ApplicationController,
  UserAccountController,
  UserModuleController,
  UserRoleController,
  UserStatusController,
} from './controllers';
import {
  ApplicationService,
  UserAccountService,
  UserModuleService,
  UserRoleService,
  UserStatusService,
} from './services';
import { PrismaModule } from 'prisma';
import { CoreModule } from 'src/core';
import { MailerModule } from '../mailer/mailer.module';

// create module user
@Module({
  imports: [PrismaModule, CoreModule, MailerModule],
  controllers: [
    UserStatusController,
    ApplicationController,
    UserModuleController,
    UserRoleController,
    UserAccountController,
  ],
  providers: [
    UserStatusService,
    ApplicationService,
    UserModuleService,
    UserRoleService,
    UserAccountService,
  ],
  exports: [],
})
export class UserModule {}
