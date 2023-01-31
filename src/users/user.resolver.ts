import { KakaoLoginOutput, KakaoLoginInput } from './dtos/kakaoLogin.dto';
import {
  CreateFeedbackInput,
  CreateFeedbackOutput,
} from './dtos/createFeedback.dto';
import {
  SendFindPasswordMailInput,
  SendFindPasswordMailOutput,
} from './dtos/sendFindPasswordMail.dto';
import {
  CheckPasswordInput,
  CheckPasswordOutput,
} from './dtos/checkPassword.dto';
import { MeOutput } from './dtos/me.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  SendVerificationMailInput,
  SendVerificationMailOutput,
} from './dtos/sendVerificationMail.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileOutput, UserProfileInput } from './dtos/userProfile.dto';
import { RegisterInput, RegisterOutput } from './dtos/register.dto';
import { User } from './entities/user.entity';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthUser } from 'src/auth/auth-user.decorator';
import {
  EmailVerificationOutput,
  EmailVerificationInput,
} from './dtos/EmailVerification.dto';
import { Response } from 'express';
import { Role } from 'src/auth/role.decorators';
import { EditProfileOutput, EditProfileInput } from './dtos/editProfile.dto';
import { RestoreUserInput } from './dtos/restoreUser.dto';
import {
  ChangePasswordAfterVerifyingOutput,
  ChangePasswordAfterVerifyingInput,
} from './dtos/changePasswordAfterVerifying.dto';

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
  async login(
    @Args('input') loginInput: LoginInput,
    @Context() context,
  ): Promise<LoginOutput> {
    const res: Response = context.req.res;
    return this.userService.login(loginInput, res);
  }

  @Mutation(() => CoreOutput)
  async logout(@Context() context): Promise<CoreOutput> {
    const res: Response = context.req.res;
    return this.userService.logout(res);
  }

  @Mutation(() => SendVerificationMailOutput)
  async sendVerificationMail(
    @Args('input') sendVerificationMailInput: SendVerificationMailInput,
  ): Promise<SendVerificationMailOutput> {
    return this.userService.sendVerificationMail(sendVerificationMailInput);
  }

  @Query(() => MeOutput)
  me(@AuthUser() user: User): Promise<MeOutput> {
    return this.userService.me(user);
  }

  @Mutation(() => EmailVerificationOutput)
  async emailVerification(
    @Args('input') emailVerificationInput: EmailVerificationInput,
  ): Promise<EmailVerificationOutput> {
    return this.userService.emailVerification(emailVerificationInput);
  }

  @Role(['ANY'])
  @Mutation(() => CheckPasswordOutput)
  async checkPassword(
    @Args('input') checkPassWordInput: CheckPasswordInput,
    @AuthUser() user: User,
  ): Promise<CheckPasswordOutput> {
    return this.userService.checkPassword(checkPassWordInput, user);
  }

  @Role(['ANY'])
  @Mutation(() => EditProfileOutput)
  async editProfile(
    @Args('input') editProfileInput: EditProfileInput,
    @AuthUser() user: User,
  ): Promise<EditProfileOutput> {
    return this.userService.editProfile(editProfileInput, user);
  }

  @Role(['ANY'])
  @Mutation(() => CoreOutput)
  async deleteUser(@AuthUser() user: User): Promise<CoreOutput> {
    return this.userService.deleteUser(user);
  }

  @Role(['ANY'])
  @Mutation(() => CoreOutput)
  async restoreUser(
    @Args('input') restoreUserInput: RestoreUserInput,
  ): Promise<CoreOutput> {
    return this.userService.restoreUser(restoreUserInput);
  }

  @Mutation(() => SendFindPasswordMailOutput)
  async sendFindPasswordMail(
    @Args('input') sendFindPasswordMailInput: SendFindPasswordMailInput,
  ): Promise<SendFindPasswordMailOutput> {
    return this.userService.sendFindPasswordMail(sendFindPasswordMailInput);
  }

  @Mutation(() => ChangePasswordAfterVerifyingOutput)
  async changePasswordAfterVerifying(
    @Args('input')
    changePasswordAfterVerifyingInput: ChangePasswordAfterVerifyingInput,
  ): Promise<ChangePasswordAfterVerifyingOutput> {
    return this.userService.changePasswordAfterVerifying(
      changePasswordAfterVerifyingInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => CreateFeedbackOutput)
  async createFeedback(
    @Args('input') createFeedback: CreateFeedbackInput,
    @AuthUser() user: User,
  ): Promise<CreateFeedbackOutput> {
    return this.userService.createFeedback(createFeedback, user);
  }

  @Mutation(() => KakaoLoginOutput)
  async kakaoLogin(
    @Args('input') kakaoLoginInput: KakaoLoginInput,
  ): Promise<KakaoLoginOutput> {
    return this.userService.kakaoLogin(kakaoLoginInput);
  }
}
