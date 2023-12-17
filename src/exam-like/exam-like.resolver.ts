import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExamLikeService } from './exam-like.service';
import { Role } from 'src/auth/role.decorators';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  ToggleExamLikeInput,
  ToggleExamLikeOutput,
} from './dtos/ToggleExamLike.dto';
import { ExamLike } from './entities/exam-like.entity';

@Resolver(() => ExamLike)
export class ExamLikeResolver {
  constructor(private readonly examLikeService: ExamLikeService) {}

  @Role(['ANY'])
  @Mutation(() => ToggleExamLikeOutput)
  ToggleExamLike(
    @AuthUser() user: User,
    @Args('input') toggleExamLikeInput: ToggleExamLikeInput,
  ): Promise<ToggleExamLikeOutput> {
    return this.examLikeService.toggleExamLike(user, toggleExamLikeInput);
  }
}
