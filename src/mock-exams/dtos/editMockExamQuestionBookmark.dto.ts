import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class EditMockExamQuestionBookmarkInput {
  @Field(() => Number)
  questionId: number;
}

@ObjectType()
export class EditMockExamQuestionBookmarkOutput extends CoreOutput {
  @Field(() => Boolean, { defaultValue: false })
  currentState?: boolean;
}
