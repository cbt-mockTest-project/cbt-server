import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileOutput, UserProfileInput } from './dtos/userProfile.dto';
import { RegisterInput, RegisterOutput } from './dtos/register.dto';
import { User } from './entities/user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { JwtService } from 'src/jwt/jwt.service';
import { Role } from 'src/auth/role.decorators';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Role(['ANY'])
  @Mutation(() => RegisterOutput)
  async register(
    @Args('input') registerInput: RegisterInput,
  ): Promise<RegisterOutput> {
    return this.userService.register(registerInput);
  }

  @Role(['ANY'])
  @Query(() => UserProfileOutput)
  async userProfile(
    @Args('input') userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.userService.userProfile(userProfileInput);
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @Role(['ANY'])
  @Query(() => User)
  me(@AuthUser() me: User) {
    return me;
  }
}
