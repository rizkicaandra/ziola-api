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
import { MailerModule } from '../mailer/mailer.module';
import { AuthModule } from '../auth';

// create module user
@Module({
  imports: [PrismaModule, MailerModule, AuthModule],
  controllers: [
    UserStatusController,
    ApplicationController,
    UserModuleController,
    UserRoleController,
    UserAccountController,
  ],
  providers: [
    UserAccountService,
    ApplicationService,
    UserStatusService,
    UserModuleService,
    UserRoleService,
  ],
  exports: [UserAccountService],
})
export class UserModule {}
