import { QuizComment } from '../entities/quizComment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class CreateQuizCommentInput extends PickType(QuizComment, ['content']) {
  @Field(() => Number)
  quizId: number;
}

@ObjectType()
export class CreateQuizCommentOutput extends CoreOutput {
  @Field(() => QuizComment, { nullable: true })
  comment?: QuizComment;
}
