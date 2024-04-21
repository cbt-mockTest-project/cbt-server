import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CategoryInvitationLink } from './entities/category-invitation-link.entity';
import { CategoryInvitationLinkService } from './category-invitation-link.service';
import { Role } from 'src/auth/role.decorators';
import { User } from 'src/users/entities/user.entity';
import {
  CreateCategoryInvitationLinkInput,
  CreateCategoryInvitationLinkOutput,
} from './dtos/create-category-invitation-link.dto';
import {
  ApproveCategoryInvitationLinkInput,
  ApproveCategoryInvitationLinkOutput,
} from './dtos/approve-category-invitation-link.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver(() => CategoryInvitationLink)
export class CategoryInvitationLinkResolver {
  constructor(
    private readonly categoryInvitationLinkService: CategoryInvitationLinkService,
  ) {}

  @Mutation(() => CreateCategoryInvitationLinkOutput)
  @Role(['ANY'])
  async createCategoryInvitationLink(
    @AuthUser()
    user: User,
    @Args('input')
    createCategoryInvitationLinkInput: CreateCategoryInvitationLinkInput,
  ): Promise<CreateCategoryInvitationLinkOutput> {
    return this.categoryInvitationLinkService.createCategoryInvitationLink(
      user,
      createCategoryInvitationLinkInput,
    );
  }

  @Mutation(() => ApproveCategoryInvitationLinkOutput)
  @Role(['ANY'])
  async approveCategoryInvitationLink(
    @AuthUser()
    user: User,
    @Args('input')
    approveCategoryInvitationLinkInput: ApproveCategoryInvitationLinkInput,
  ): Promise<ApproveCategoryInvitationLinkOutput> {
    return this.categoryInvitationLinkService.approveCategoryInvitationLink(
      user,
      approveCategoryInvitationLinkInput,
    );
  }
}
