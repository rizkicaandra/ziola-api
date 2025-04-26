import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { PrismaModule } from 'prisma';

// create module user
@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
