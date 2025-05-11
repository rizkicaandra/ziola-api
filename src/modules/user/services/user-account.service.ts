import { Injectable } from '@nestjs/common';
import {
  CreateUserAccountDto,
  FindUserAccountByIdDto,
  FindUserAccountDto,
  FindUserAccountInternalDto,
  UpdateUserAccountByIdDto,
  UpdateUserAccountPasswordByIdDto,
  UpdateUserAccountRoleByIdDto,
  UpdateUserAccountStatusByIdDto,
} from '../dto';
import { BcryptHelper, CommonHelper } from 'src/core/helpers';
import { PrismaService } from 'prisma';
import { ResponseGeneratorService } from 'src/core/responses';
import {
  AppErrorCode,
  MailerSubject,
  MailerType,
  userStatusCode,
} from 'src/core/enums';
import { Prisma, UserAccount } from '@prisma/client';
import { PaginationUtil } from 'src/core/utils';
import { UserStatusService } from './user-status.service';
import { UserRoleService } from './user-role.service';
import { MailerService } from 'src/modules/mailer';

@Injectable()
export class UserAccountService {
  constructor(
    private readonly commonHelper: CommonHelper,
    private readonly bcryptHelper: BcryptHelper,
    private readonly prisma: PrismaService,
    private readonly response: ResponseGeneratorService,
    private readonly paginationUtil: PaginationUtil,
    private readonly userStatusService: UserStatusService,
    private readonly userRoleService: UserRoleService,
    private readonly mailerService: MailerService,
  ) {}

  /**
   * Find one user account by email or phone and application code.
   *
   * @param findOneInternalDto Find one internal dto.
   * @returns User account or null if not found.
   * @throws {BadRequestError} If the user account already exists.
   * @throws {NotFoundError} If the user account is not found.
   */
  async findOneInternal(
    findOneInternalDto: FindUserAccountInternalDto,
  ): Promise<UserAccount | null> {
    // Include user role with permissions if isIncludeRole is true
    const userRole = findOneInternalDto.isIncludeRole
      ? {
          include: {
            userPermissions: true,
          },
        }
      : false;

    // Find one user account by email or phone and application code
    const userAccount = await this.prisma.userAccount.findFirst({
      include: {
        userRole,
      },
      where: {
        OR: [
          {
            email: findOneInternalDto.email,
          },
          {
            phone: findOneInternalDto.phone,
          },
        ],
        applicationCode: findOneInternalDto.applicationCode,
      },
    });

    // Check if user account already exists
    if (userAccount && findOneInternalDto.isExist) {
      throw this.response.badRequest(
        `User account email: ${findOneInternalDto.email} or phone: ${findOneInternalDto.phone} is already exists.`,
      );
    }

    // Check if user account is not found
    if (!userAccount && findOneInternalDto.isNotFound) {
      throw this.response.notFound(AppErrorCode.USER_ACCOUNT_NOT_FOUND);
    }

    return userAccount;
  }

  /**
   * Create a new user account.
   *
   * @param createDto Create user account dto.
   * @returns Created user account.
   */
  // generate password
  async create(createDto: CreateUserAccountDto) {
    const password = this.commonHelper.generatePassword(7);

    // hash password
    const hashedPassword = await this.bcryptHelper.hash(password);

    // check if user account already exists
    await this.findOneInternal({
      applicationCode: createDto.applicationCode,
      email: createDto.email,
      phone: createDto.phone,
      isExist: true,
    });

    // create user account
    const userAccount = await this.prisma.userAccount.create({
      select: {
        name: true,
        email: true,
        phone: true,
        userRole: {
          select: {
            name: true,
          },
        },
        application: {
          select: {
            nameId: true,
            nameEn: true,
          },
        },
        userStatus: {
          select: {
            nameId: true,
            nameEn: true,
          },
        },
        createdBy: true,
        createdAt: true,
      },
      data: {
        name: createDto.name,
        email: createDto.email,
        phone: createDto.phone,
        password: hashedPassword,
        applicationCode: createDto.applicationCode,
        createdBy: createDto.createdBy,
        userRoleId: createDto.userRoleId,
        status: userStatusCode.ACTIVE,
      },
    });

    // send email to user
    await this.mailerService.sendEmail({
      emailReciever: createDto.email,
      subject: MailerSubject.CREDENTIAL_USER,
      template: {
        type: MailerType.NEW_USER,
        email: createDto.email,
        name: createDto.name,
        password: password,
      },
    });

    return userAccount;
  }

  /**
   * Find one user account by id
   * @param findOneDto - The dto of finding one user account
   * @returns The user account if found, otherwise null if findOneDto.isNotFound is false
   * @throws {NotFoundError} If findOneDto.isNotFound is true and the user account is not found
   */
  async findOneById<T extends FindUserAccountByIdDto>(
    findOneDto: T,
  ): Promise<T['isNotFound'] extends true ? UserAccount : UserAccount | null> {
    const select: Prisma.UserAccountSelect = {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      email: true,
      phone: true,
      password: findOneDto.isShowPassword,
      applicationCode: true,
      userStatus: {
        select: {
          code: true,
          nameId: true,
          nameEn: true,
        },
      },
    };

    // find the user account by id
    const userAccount = await this.prisma.userAccount.findFirst({
      select,
      where: {
        id: findOneDto.userAccountId,
      },
    });

    // if the user account is not found and isNotFound is true, throw a not found error
    if (!userAccount && findOneDto.isNotFound)
      throw this.response.notFound(AppErrorCode.USER_ACCOUNT_NOT_FOUND);

    // return the user account
    return userAccount as any;
  }

  /**
   * Find all user accounts with optional search and pagination.
   *
   * @param findAllDto - DTO containing search and pagination information.
   * @returns An object containing the total count and an array of user accounts.
   */
  async findAll(findAllDto: FindUserAccountDto) {
    // Initialize query options with default ordering by creation date
    let options: Prisma.UserAccountFindManyArgs = {
      orderBy: {
        createdAt: 'desc',
      },
    };

    // Add search conditions if search term is provided
    if (findAllDto.search) {
      options.where = {
        OR: [
          {
            name: {
              contains: findAllDto.search,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: findAllDto.search,
              mode: 'insensitive',
            },
          },
          {
            phone: {
              contains: findAllDto.search,
              mode: 'insensitive',
            },
          },
          {
            applicationCode: {
              contains: findAllDto.search,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    // Prepare count options based on the query filters
    let optionsCount: Prisma.UserAccountCountArgs = {
      where: options.where,
    };

    // Apply pagination to the query options
    options = this.paginationUtil.applyPagination(findAllDto, options);

    // Fetch user accounts and their total count asynchronously
    const [userAccounts, total] = await Promise.all([
      this.prisma.userAccount.findMany({
        ...options,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          applicationCode: true,
          userRoleId: true,
          status: true,
          application: {
            select: {
              nameId: true,
              nameEn: true,
            },
          },
          userRole: {
            select: {
              name: true,
            },
          },
          userStatus: {
            select: {
              nameEn: true,
              nameId: true,
            },
          },
        },
      }),
      this.prisma.userAccount.count(optionsCount),
    ]);

    // Return total count and list of user accounts
    return {
      total,
      items: userAccounts,
    };
  }

  /**
   * Update user account details.
   *
   * @param updateDto - Data transfer object containing updated user account information.
   * @returns The updated user account.
   * @throws {NotFoundError} If the user account does not exist.
   * @throws {BadRequestError} If the email or phone number is already in use within the same application.
   */
  async update(updateDto: UpdateUserAccountByIdDto) {
    // Ensure the account exists
    const existingAccount = await this.findOneById({
      userAccountId: updateDto.userAccountId,
      isNotFound: true,
    });

    // Check for duplicate email or phone within the same application
    const duplicateAccount = await this.prisma.userAccount.findFirst({
      where: {
        OR: [{ email: updateDto.email }, { phone: updateDto.phone }],
        id: { not: updateDto.userAccountId },
        applicationCode: existingAccount.applicationCode,
      },
    });

    if (duplicateAccount) {
      throw this.response.badRequest(
        `User account with email: ${updateDto.email} or phone: ${updateDto.phone} already exists.`,
      );
    }

    // Update the account details
    const updatedAccount: Partial<UserAccount> =
      await this.prisma.userAccount.update({
        where: { id: updateDto.userAccountId },
        data: {
          name: updateDto.name,
          email: updateDto.email,
          phone: updateDto.phone,
          updatedBy: updateDto.updatedBy,
        },
      });

    if (updatedAccount.password) delete updatedAccount.password;

    return updatedAccount;
  }

  /**
   * Update the status of a user account.
   *
   * @param updateStatusDto - Data transfer object containing the updated user account status.
   * @returns The updated user account.
   * @throws {NotFoundError} If the user account does not exist.
   * @throws {NotFoundError} If the user status does not exist.
   */
  async updateStatus(updateStatusDto: UpdateUserAccountStatusByIdDto) {
    // Ensure the account exists
    await this.findOneById({
      userAccountId: updateStatusDto.userAccountId,
      isNotFound: true,
    });

    // Ensure the status exists
    await this.userStatusService.findOneByCode({
      userStatusCode: updateStatusDto.userStatusCode,
      isNotFound: true,
    });

    // Update the user account status
    const updatedAccount = await this.prisma.userAccount.update({
      select: {
        id: true,
        status: true,
      },
      where: {
        id: updateStatusDto.userAccountId,
      },
      data: {
        status: updateStatusDto.userStatusCode,
      },
    });

    return updatedAccount;
  }

  /**
   * Update the role of a user account.
   *
   * @param updateRoleDto - Data transfer object containing the updated user account role.
   * @returns The updated user account.
   * @throws {NotFoundError} If the user account does not exist.
   * @throws {NotFoundError} If the user role does not exist.
   */
  async updateRole(updateRoleDto: UpdateUserAccountRoleByIdDto) {
    // Check if the account exists
    await this.findOneById({
      userAccountId: updateRoleDto.userAccountId,
      isNotFound: true,
    });

    // Check if the role exists
    await this.userRoleService.findOneById({
      userRoleId: updateRoleDto.userRoleId,
      isNotFound: true,
    });

    // Update the user account role
    const userAccountRole = await this.prisma.userAccount.update({
      select: {
        id: true,
        userRoleId: true,
      },
      where: {
        id: updateRoleDto.userAccountId,
      },
      data: {
        userRoleId: updateRoleDto.userRoleId,
        updatedBy: updateRoleDto.updatedBy,
      },
    });

    return userAccountRole;
  }

  /**
   * Update the password of a user account.
   *
   * @param updatePasswordDto - Data transfer object containing the current and new passwords.
   * @returns The updated user account.
   * @throws {NotFoundError} If the user account does not exist.
   * @throws {BadRequestError} If the new password is the same as the current password.
   * @throws {BadRequestError} If the current password does not match the stored password.
   */
  async updatePassword(updatePasswordDto: UpdateUserAccountPasswordByIdDto) {
    // Ensure the account exists and retrieve the current password
    const userAccount = await this.findOneById({
      userAccountId: updatePasswordDto.userAccountId,
      isNotFound: true,
      isShowPassword: true,
    });

    // Check if the new password is the same as the current password
    if (updatePasswordDto.currentPassword === updatePasswordDto.newPassword) {
      throw this.response.badRequest(
        AppErrorCode.USER_ACCOUNT_PASSWORD_MUST_BE_DIFFERENT_WITH_NEW_ONE,
      );
    }

    // Verify that the current password matches the stored password
    const isCurrentPasswordValid = await this.bcryptHelper.compare(
      updatePasswordDto.currentPassword,
      userAccount.password,
    );
    if (!isCurrentPasswordValid) {
      throw this.response.badRequest(
        AppErrorCode.USER_ACCOUNT_CURRENT_PASSWORD_NOT_MATCH,
      );
    }

    // Hash the new password
    const hashedPassword = await this.bcryptHelper.hash(
      updatePasswordDto.newPassword,
    );

    // Update the user account with the new password
    const updatedUserAccount = await this.prisma.userAccount.update({
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
      },
      where: {
        id: userAccount.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return updatedUserAccount;
  }
}
