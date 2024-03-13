import { QuizComment } from '../entities/quizComment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class DeleteQuizCommentInput extends PickType(QuizComment, ['id']) {}

@ObjectType()
export class DeleteQuizCommentOutput extends CoreOutput {}
