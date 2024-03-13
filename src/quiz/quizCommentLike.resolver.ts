import { User } from 'src/users/entities/user.entity';
import {
  EditQuizCommentLikeOutput,
  EditQuizCommentLikeInput,
} from './dtos/editQuizCommentLike.dto';
import { QuizCommentLikeService } from './quizCommentLike.service';
import { QuizCommentLike } from './entities/quizCommentLike.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorators';

@Resolver(() => QuizCommentLike)
export class QuizCommentLikeResolver {
  constructor(
    private readonly quizCommentLikeService: QuizCommentLikeService,
  ) {}

  @Role(['ANY'])
  @Mutation(() => EditQuizCommentLikeOutput)
  async editQuizCommentLike(
    @Args('input')
    editQuizCommentLikeInput: EditQuizCommentLikeInput,
    @AuthUser()
    user: User,
  ): Promise<EditQuizCommentLikeOutput> {
    return this.quizCommentLikeService.editQuizCommentLike(
      editQuizCommentLikeInput,
      user,
    );
  }
}
