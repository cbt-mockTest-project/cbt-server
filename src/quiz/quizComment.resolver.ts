import { PUB_SUB } from 'src/common/common.constants';
import { QuizComment } from './entities/quizComment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  DeleteQuizCommentInput,
  DeleteQuizCommentOutput,
} from './dtos/deleteQuizComment.dto';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/role.decorators';
import {
  CreateQuizCommentInput,
  CreateQuizCommentOutput,
} from './dtos/createQuizComment.dto';
import {
  EditQuizCommentInput,
  EditQuizCommentOutput,
} from './dtos/editQuizComment.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { QuizCommentSerivce } from './quizComment.service';

@Resolver(() => QuizComment)
export class QuizCommentResolver {
  constructor(private readonly quizCommentSerivce: QuizCommentSerivce) {}

  @Mutation(() => CreateQuizCommentOutput)
  @Role(['ANY'])
  createQuizComment(
    @Args('input')
    createQuizCommentInput: CreateQuizCommentInput,
    @AuthUser() user: User,
  ): Promise<CreateQuizCommentOutput> {
    return this.quizCommentSerivce.createQuizComment(
      createQuizCommentInput,
      user,
    );
  }

  @Mutation(() => EditQuizCommentOutput)
  @Role(['ANY'])
  async editQuizComment(
    @Args('input')
    editQuizCommentInput: EditQuizCommentInput,
    @AuthUser() user: User,
  ): Promise<EditQuizCommentOutput> {
    return this.quizCommentSerivce.editQuizComment(editQuizCommentInput, user);
  }

  @Mutation(() => DeleteQuizCommentOutput)
  @Role(['ANY'])
  async deleteQuizComment(
    @Args('input')
    deleteQuizCommentInput: DeleteQuizCommentInput,
    @AuthUser() user: User,
  ): Promise<DeleteQuizCommentOutput> {
    return this.quizCommentSerivce.deleteQuizComment(
      deleteQuizCommentInput,
      user,
    );
  }

  // @Role(['ANY'])
  // @Subscription(() => CoreOutput, {
  //   filter: (payload, variables, context) => {
  //     if (context.user.id !== payload.quizCommentUpdates.authorId) {
  //       return false;
  //     }
  //     return true;
  //   },
  // })
  // quizCommentUpdates() {
  //   return this.pubSub.asyncIterator('quizComments');
  // }
}
