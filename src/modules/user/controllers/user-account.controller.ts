import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
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

@Controller('user-accounts')
export class UserAccountController {
  constructor(
    private readonly response: ResponseGeneratorService,
    private readonly userAccountService: UserAccountService,
  ) {}

  @Post()
  async create(@Body() createDto: CreateUserAccountDto) {
    const userAccount = await this.userAccountService.create(createDto);

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
  async update(
    @Param() paramDto: FindUserAccountParam,
    @Body() updateDto: UpdateUserAccountBodyDto,
  ) {
    const userAccount = await this.userAccountService.update({
      ...paramDto,
      ...updateDto,
    });

    return this.response.success({
      userAccount,
    });
  }

  @Patch(':userAccountId/status')
  async updateStatus(
    @Param() paramDto: FindUserAccountParam,
    @Body() updateDto: UpdateUserAccountStatusBodyDto,
  ) {
    const userAccount = await this.userAccountService.updateStatus({
      ...paramDto,
      ...updateDto,
    });

    return this.response.success({
      userAccount,
    });
  }

  @Patch(':userAccountId/role')
  async updateRole(
    @Param() paramDto: FindUserAccountParam,
    @Body() updateDto: UpdateUserAccountRoleBodyDto,
  ) {
    const userAccount = await this.userAccountService.updateRole({
      ...paramDto,
      ...updateDto,
    });

    return this.response.success({
      userAccount,
    });
  }

  @Patch(':userAccountId/password')
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
