import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services';
import { SignInDto } from '../dto';
import { ResponseGeneratorService } from 'src/core/responses';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly response: ResponseGeneratorService,
  ) {}

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const token = await this.authService.signIn(signInDto);

    return this.response.success(token);
  }
}
