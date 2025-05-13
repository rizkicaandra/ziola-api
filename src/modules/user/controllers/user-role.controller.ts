import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserRoleDto,
  FindUserRoleByIdParam,
  FindUserRoleByIdQuery,
  FindUserRoleDto,
  UpdateUserRoleBodyDto,
} from '../dto';
import { UserRoleService } from '../services';
import { ResponseGeneratorService } from 'src/core/responses';
import { SuiteGuard, SuitePermissionsGuard } from 'src/core/guards';
import { RequireSuitePermissions } from 'src/core/decorators';
import { UserSubmoduleCode } from 'src/core/enums';

@Controller('user-roles')
@UseGuards(SuiteGuard, SuitePermissionsGuard)
export class UserRoleController {
  constructor(
    private readonly userRoleService: UserRoleService,
    private readonly response: ResponseGeneratorService,
  ) {}

  @Post()
  @RequireSuitePermissions({
    userSubmoduleCode: UserSubmoduleCode.ROLE,
    action: { create: true },
  })
  async create(@Body() createDto: CreateUserRoleDto) {
    const userRole = await this.userRoleService.create(createDto);

    return this.response.created(userRole);
  }

  @Get()
  async findAll(@Query() findAllDto: FindUserRoleDto) {
    const userRoles = await this.userRoleService.findAll(findAllDto);

    return this.response.success(userRoles);
  }

  @Get(':userRoleId')
  async findOneById(
    @Param() paramDto: FindUserRoleByIdParam,
    @Query() queryDto: FindUserRoleByIdQuery,
  ) {
    const userRole = await this.userRoleService.findOneById({
      ...paramDto,
      ...queryDto,
    });

    return this.response.success(userRole);
  }

  @Put(':userRoleId')
  @RequireSuitePermissions({
    userSubmoduleCode: UserSubmoduleCode.ROLE,
    action: { update: true },
  })
  async updateById(
    @Param() paramDto: FindUserRoleByIdParam,
    @Body() updateDto: UpdateUserRoleBodyDto,
  ) {
    const userRole = await this.userRoleService.updateById({
      ...paramDto,
      ...updateDto,
    });

    return this.response.success(userRole);
  }
}
