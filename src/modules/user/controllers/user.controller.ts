import { Controller, Get, Headers } from '@nestjs/common';
import { UserService } from '../services';
import { ResponseGeneratorService } from 'src/core/responses';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly response: ResponseGeneratorService,
  ) {}

  @Get('/status')
  async getStatuses(@Headers('request-id') requestId: string) {
    const statues = await this.userService.getStatuses();

    return this.response.success(statues);
  }
}
