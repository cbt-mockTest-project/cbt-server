import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExamCategoryInvitation } from './entities/exam-category-invitation.entity';
import { ExamCategoryInvitationService } from './exam-category-invitation.service';
import {
  CreateExamCategoryInvitationInput,
  CreateExamCategoryInvitationOutput,
} from './dtos/createExamCategoryInvitation.dto';
import { User } from 'src/users/entities/user.entity';
import {
  DeleteExamCategoryInvitationInput,
  DeleteExamCategoryInvitationOutput,
} from './dtos/deleteExamCategoryInvitation.dto';
import { GetExamCategoryInvitationsOutput } from './dtos/getExamCategoryInvitations.dto';
import {
  AcceptExamCategoryInvitationInput,
  AcceptExamCategoryInvitationOutput,
} from './dtos/acceptExamCategoryInvitation.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorators';

@Resolver(() => ExamCategoryInvitation)
export class ExamCategoryInvitationResolver {
  constructor(
    private readonly examCategoryInvitationService: ExamCategoryInvitationService,
  ) {}

  @Role(['ANY'])
  @Mutation(() => CreateExamCategoryInvitationOutput)
  createExamCategoryInvitation(
    @AuthUser() user: User,
    @Args('input')
    createExamCategoryInvitationInput: CreateExamCategoryInvitationInput,
  ): Promise<CreateExamCategoryInvitationOutput> {
    return this.examCategoryInvitationService.createExamCategoryInvitation(
      user,
      createExamCategoryInvitationInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => DeleteExamCategoryInvitationOutput)
  deleteExamCategoryInvitation(
    @AuthUser() user: User,
    @Args('input')
    deleteExamCategoryInvitationInput: DeleteExamCategoryInvitationInput,
  ): Promise<DeleteExamCategoryInvitationOutput> {
    return this.examCategoryInvitationService.deleteExamCategoryInvitation(
      user,
      deleteExamCategoryInvitationInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => AcceptExamCategoryInvitationOutput)
  acceptExamCategoryInvitation(
    @AuthUser() user: User,
    @Args('input')
    acceptExamCategoryInvitationInput: AcceptExamCategoryInvitationInput,
  ): Promise<AcceptExamCategoryInvitationOutput> {
    return this.examCategoryInvitationService.acceptExamCategoryInvitation(
      user,
      acceptExamCategoryInvitationInput,
    );
  }

  @Role(['ANY'])
  @Query(() => GetExamCategoryInvitationsOutput)
  getExamCategoryInvitations(
    @AuthUser() user: User,
  ): Promise<GetExamCategoryInvitationsOutput> {
    return this.examCategoryInvitationService.getExamCategoryInvitations(user);
  }
}
