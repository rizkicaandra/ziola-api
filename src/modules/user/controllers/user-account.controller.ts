import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponseGeneratorService } from 'src/core/responses';
import {
  CreateUserAccountDto,
  FindUserAccountDto,
  FindUserAccountParam,
  FindUserAccountQuery,
  UpdateUserAccountBodyDto,
  UpdateUserAccountPasswordBodyDto,
  UpdateUserAccountRoleBodyDto,
  UpdateUserAccountStatusBodyDto,
} from '../dto';
import { UserAccountService } from '../services';
import { SuiteGuard, SuitePermissionsGuard } from 'src/core/guards';
import { RequireSuitePermissions, UserProfile } from 'src/core/decorators';
import { UserSubmoduleCode } from 'src/core/enums';
import { UserAccount } from '@prisma/client';

@Controller('user-accounts')
@UseGuards(SuiteGuard, SuitePermissionsGuard)
export class UserAccountController {
  constructor(
    private readonly response: ResponseGeneratorService,
    private readonly userAccountService: UserAccountService,
  ) {}

  @Post()
  @RequireSuitePermissions({
    userSubmoduleCode: UserSubmoduleCode.USER,
    action: { create: true },
  })
  async create(
    @Body() createDto: CreateUserAccountDto,
    @UserProfile() userProfile: UserAccount,
  ) {
    const userAccount = await this.userAccountService.create({
      ...createDto,
      createdBy: userProfile.email,
    });

    return this.response.created({
      userAccount,
    });
  }

  @Get(':userAccountId')
  async findOneById(
    @Param() paramDto: FindUserAccountParam,
    @Query() queryDto: FindUserAccountQuery,
  ) {
    const userAccount = await this.userAccountService.findOneById({
      ...paramDto,
      ...queryDto,
    });

    return this.response.success(userAccount);
  }

  @Get()
  async findAll(@Query() findAllDto: FindUserAccountDto) {
    const userAccounts = await this.userAccountService.findAll(findAllDto);

    return this.response.success(userAccounts);
  }

  @Put(':userAccountId')
  @RequireSuitePermissions({
    userSubmoduleCode: UserSubmoduleCode.USER,
    action: { update: true },
  })
  async update(
    @Param() paramDto: FindUserAccountParam,
    @Body() updateDto: UpdateUserAccountBodyDto,
    @UserProfile() userProfile: UserAccount,
  ) {
    const userAccount = await this.userAccountService.update({
      ...paramDto,
      ...updateDto,
      updatedBy: userProfile.email,
    });

    return this.response.success({
      userAccount,
    });
  }

  @Patch(':userAccountId/status')
  @RequireSuitePermissions({
    userSubmoduleCode: UserSubmoduleCode.USER,
    action: { update: true },
  })
  async updateStatus(
    @Param() paramDto: FindUserAccountParam,
    @Body() updateDto: UpdateUserAccountStatusBodyDto,
    @UserProfile() userProfile: UserAccount,
  ) {
    const userAccount = await this.userAccountService.updateStatus({
      ...paramDto,
      ...updateDto,
      updatedBy: userProfile.email,
    });

    return this.response.success({
      userAccount,
    });
  }

  @Patch(':userAccountId/role')
  @RequireSuitePermissions({
    userSubmoduleCode: UserSubmoduleCode.USER,
    action: { update: true },
  })
  async updateRole(
    @Param() paramDto: FindUserAccountParam,
    @Body() updateDto: UpdateUserAccountRoleBodyDto,
    @UserProfile() userProfile: UserAccount,
  ) {
    const userAccount = await this.userAccountService.updateRole({
      ...paramDto,
      ...updateDto,
      updatedBy: userProfile.email,
    });

    return this.response.success({
      userAccount,
    });
  }

  @Patch(':userAccountId/password')
  @RequireSuitePermissions({
    userSubmoduleCode: UserSubmoduleCode.USER,
    action: { update: true },
  })
  async updatePassword(
    @Param() paramDto: FindUserAccountParam,
    @Body() updateDto: UpdateUserAccountPasswordBodyDto,
  ) {
    const userAccount = await this.userAccountService.updatePassword({
      ...paramDto,
      ...updateDto,
    });

    return this.response.success({
      userAccount,
    });
  }
}
