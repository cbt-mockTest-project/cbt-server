import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorators';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  EmailVerificationInput,
  EmailVerificationOutput,
} from './dtos/EmailVerification.dto';
import {
  ChangePasswordAfterVerifyingInput,
  ChangePasswordAfterVerifyingOutput,
} from './dtos/changePasswordAfterVerifying.dto';
import {
  CheckPasswordInput,
  CheckPasswordOutput,
} from './dtos/checkPassword.dto';
import {
  CreateFeedbackInput,
  CreateFeedbackOutput,
} from './dtos/createFeedback.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/editProfile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { MeOutput } from './dtos/me.dto';
import { RegisterInput, RegisterOutput } from './dtos/register.dto';
import { RestoreUserInput } from './dtos/restoreUser.dto';
import { SearchUserInput, SearchUserOutput } from './dtos/searchUser.dto';
import {
  SendFindPasswordMailInput,
  SendFindPasswordMailOutput,
} from './dtos/sendFindPasswordMail.dto';
import {
  SendVerificationMailInput,
  SendVerificationMailOutput,
} from './dtos/sendVerificationMail.dto';
import {
  UpdateAdblockPermissionInput,
  UpdateAdblockPermissionOutput,
} from './dtos/updateAdblockPermission.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/userProfile.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import {
  CheckUserRoleInput,
  CheckUserRoleOutput,
} from './dtos/checkUserRole.dto';
import { ChangeClientRoleInput } from './dtos/changeClientRole.dto';
import {
  ChangeClientRoleAndCreatePaymentInput,
  ChangeClientRoleAndCreatePaymentOutput,
} from './dtos/changeClientRoleAndCreatePayment.dto';
import {
  CreateUserRoleInput,
  CreateUserRoleOutput,
} from './dtos/createUserRole.dto';
import {
  DeleteUserRoleInput,
  DeleteUserRoleOutput,
} from './dtos/deleteUserRole.dto';
import { CreateFreeTrialRoleOutput } from './dtos/createFreeTrialRole.dto';
import { GetRoleCountInput, GetRoleCountOutput } from './dtos/getRoleCount';
import {
  GetUserByNicknameOrEmailInput,
  GetUserByNicknameOrEmailOutput,
} from './dtos/getUserByNicknameOrEmail.dto';
import { ProxyIp } from 'src/common/decorators/ip.decorator';
import { GetRolesCountInput, GetRolesCountOutput } from './dtos/getRolesCount';
import {
  UpsertRecentlyStudiedCategoryInput,
  UpsertRecentlyStudiedCategoryOutput,
} from './dtos/upsertRecentlyStudiedCategory.dto';

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
  me(@AuthUser() user: User, @ProxyIp() ip: string): Promise<MeOutput> {
    return this.userService.me(user, ip);
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

  @Role(['ADMIN', 'PARTNER'])
  @Query(() => SearchUserOutput)
  async searchUser(
    @Args('input') searchUserInput: SearchUserInput,
  ): Promise<SearchUserOutput> {
    return this.userService.searchUser(searchUserInput);
  }

  @Role(['ADMIN', 'PARTNER'])
  @Mutation(() => UpdateAdblockPermissionOutput)
  async updateAdBlockPermission(
    @Args('input') updateAdBlockPermissionInput: UpdateAdblockPermissionInput,
  ): Promise<UpdateAdblockPermissionOutput> {
    return this.userService.updateAdBlockPermission(
      updateAdBlockPermissionInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => CheckUserRoleOutput)
  async checkUserRole(
    @Args('input') checkUserRoleInput: CheckUserRoleInput,
    @AuthUser() user: User,
  ): Promise<CheckUserRoleOutput> {
    return this.userService.checkUserRole(checkUserRoleInput, user);
  }

  @Mutation(() => CoreOutput)
  @Role(['ANY'])
  async changeClientRole(
    @Args('input') changeClientRoleInput: ChangeClientRoleInput,
    @AuthUser() user: User,
  ): Promise<CoreOutput> {
    return this.userService.changeClientRole(changeClientRoleInput, user);
  }

  @Role(['ANY'])
  @Mutation(() => ChangeClientRoleAndCreatePaymentOutput)
  async changeClientRoleAndCreatePayment(
    @Args('input')
    changeClientRoleAndCreatePaymentInput: ChangeClientRoleAndCreatePaymentInput,
    @AuthUser() user: User,
  ): Promise<ChangeClientRoleAndCreatePaymentOutput> {
    return this.userService.changeClientRoleAndCreatePayment(
      user,
      changeClientRoleAndCreatePaymentInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => CreateUserRoleOutput)
  async createUserRole(
    @Args('input') createUserRoleInput: CreateUserRoleInput,
  ): Promise<CreateUserRoleOutput> {
    return this.userService.createUserRole(createUserRoleInput);
  }

  @Role(['ANY'])
  @Mutation(() => DeleteUserRoleOutput)
  async deleteUserRole(
    @Args('input') deleteUserRoleInput: DeleteUserRoleInput,
  ): Promise<DeleteUserRoleOutput> {
    return this.userService.deleteUserRole(deleteUserRoleInput);
  }

  @Role(['ANY'])
  @Mutation(() => CreateFreeTrialRoleOutput)
  async createFreeTrialRole(
    @AuthUser() user: User,
  ): Promise<CreateFreeTrialRoleOutput> {
    return this.userService.createFreeTrialRole(user);
  }

  @Mutation(() => CoreOutput)
  async syncRole() {
    return this.userService.syncRole();
  }

  @Query(() => GetRoleCountOutput)
  async getRoleCount(@Args('input') getRoleCountInput: GetRoleCountInput) {
    return this.userService.getRoleCount(getRoleCountInput);
  }

  @Query(() => GetRolesCountOutput)
  async getRolesCount(@Args('input') getRolesCountInput: GetRolesCountInput) {
    return this.userService.getRolesCount(getRolesCountInput);
  }

  @Query(() => GetUserByNicknameOrEmailOutput)
  async getUserByNicknameOrEmail(
    @Args('input') getUserByNicknameOrEmailInput: GetUserByNicknameOrEmailInput,
  ): Promise<GetUserByNicknameOrEmailOutput> {
    return this.userService.getUserByNicknamOrEmail(
      getUserByNicknameOrEmailInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => UpsertRecentlyStudiedCategoryOutput)
  async upsertRecentlyStudiedCategory(
    @Args('input')
    upsertRecentlyStudiedCategoryInput: UpsertRecentlyStudiedCategoryInput,
    @AuthUser() user: User,
  ): Promise<UpsertRecentlyStudiedCategoryOutput> {
    return this.userService.upsertRecentlyStudiedCategory(
      user,
      upsertRecentlyStudiedCategoryInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => CoreOutput)
  async resetRecentlyStudiedCategory(
    @AuthUser() user: User,
  ): Promise<CoreOutput> {
    return this.userService.resetRecentlyStudiedCategory(user);
  }
}
