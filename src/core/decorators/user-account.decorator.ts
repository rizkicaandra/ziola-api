import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserProfile = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.userAccount;
    return data ? user?.[data] : user;
  },
);
