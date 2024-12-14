import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserSessionDto } from 'src/domain/dtos/user-session.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserSessionDto;
  },
);
