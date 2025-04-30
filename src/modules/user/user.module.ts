import { Module } from '@nestjs/common';
import {
  ApplicationController,
  UserModuleController,
  UserStatusController,
} from './controllers';
import {
  ApplicationService,
  UserModuleService,
  UserStatusService,
} from './services';
import { PrismaModule } from 'prisma';

// create module user
@Module({
  imports: [PrismaModule],
  controllers: [
    UserStatusController,
    ApplicationController,
    UserModuleController,
  ],
  providers: [UserStatusService, ApplicationService, UserModuleService],
  exports: [],
})
export class UserModule {}
