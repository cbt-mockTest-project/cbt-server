import {
  SendVerificationMailInput,
  SendVerificationMailOutput,
} from './dtos/sendVerificationMail.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileOutput, UserProfileInput } from './dtos/userProfile.dto';
import { RegisterInput, RegisterOutput } from './dtos/register.dto';
import { User } from './entities/user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Role } from 'src/auth/role.decorators';
import { AuthUser } from 'src/auth/auth-user.decorator';
import {
  EmailVerificationOutput,
  EmailVerificationInput,
} from './dtos/EmailVerification.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => RegisterOutput)
  async register(
    @Args('input') registerInput: RegisterInput,
  ): Promise<RegisterOutput> {
    return this.userService.register(registerInput);
  }

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

  @Mutation(() => SendVerificationMailOutput)
  async sendVerificationMail(
    @Args('input') sendVerificationMailInput: SendVerificationMailInput,
  ): Promise<SendVerificationMailOutput> {
    return this.userService.sendVerificationMail(sendVerificationMailInput);
  }

  @Role(['ANY'])
  @Query(() => User)
  me(@AuthUser() me: User) {
    return me;
  }

  @Mutation(() => EmailVerificationOutput)
  async emailVerification(
    @Args('input') emailVerificationInput: EmailVerificationInput,
  ): Promise<EmailVerificationOutput> {
    return this.userService.emailVerification(emailVerificationInput);
  }
}
