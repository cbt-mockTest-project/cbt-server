import { getCookie } from './../utils/utils';
import { UserService } from './../users/user.service';
import { JwtService } from 'src/jwt/jwt.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from './role.decorators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /** 비로그인 유저 - role이 지정되어 있지 않을 경우 통과
   *  로그인 유저 - ANY일경우 ADMIN, CLIENT 모두 통과
   *  로그인 유저 - 데코레이터에 명시한 Role과 자신의 Role이 일치 할 경우 통과
   */
  async canActivate(context: ExecutionContext) {
    // Metadata에 부여한 role
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const cookie = gqlContext.req.headers.cookie;
    const token = cookie && getCookie(String(cookie), 'jwt-token');
    if (token) {
      const decodedToken = this.jwtService.verify(token);
      if (
        typeof decodedToken === 'object' &&
        decodedToken.hasOwnProperty('id')
      ) {
        const userId = decodedToken.id;
        const { user } = await this.userService.userProfile({ id: userId });
        if (user) {
          gqlContext['user'] = user;
        }
        if (roles) {
          if (roles.includes('ANY')) {
            return true;
          }
          return roles.includes(user.role);
        }
      }
    }
    // 비로그인 유저 통과
    if (!roles) {
      return true;
    }
    return false;
  }
}
