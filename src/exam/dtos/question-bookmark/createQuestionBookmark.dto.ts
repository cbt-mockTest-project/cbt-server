import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamQuestionBookmark } from 'src/exam/entities/mock-exam-question-bookmark.entity';

@InputType()
export class CreateQuestionBookmarkInput {
  @Field(() => Number)
  questionId: number;

  @Field(() => Number, { nullable: true })
  questionBookmarkFolderId?: number | null;
}

@ObjectType()
export class CreateQuestionBookmarkOutput extends CoreOutput {
  @Field(() => MockExamQuestionBookmark, { nullable: true })
  myBookmark?: MockExamQuestionBookmark;
}
