import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamQuestionBookmarkFolder } from 'src/exam/entities/mock-exam-question-bookmark-folder.entity';

@InputType()
export class ReadQuestionBookmarkFoldersInput {}

@ObjectType()
export class ReadQuestionBookmarkFoldersOutput extends CoreOutput {
  @Field(() => [MockExamQuestionBookmarkFolder], {
    nullable: true,
    defaultValue: [],
  })
  folders?: MockExamQuestionBookmarkFolder[];
}
