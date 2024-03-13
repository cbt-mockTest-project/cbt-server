import { QuizComment } from '../entities/quizComment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class EditQuizCommentInput extends PickType(QuizComment, [
  'id',
  'content',
]) {}

@ObjectType()
export class EditQuizCommentOutput extends CoreOutput {}
