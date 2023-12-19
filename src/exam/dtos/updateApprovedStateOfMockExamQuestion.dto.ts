import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class UpdateApprovedStateOfMockExamQuestionInput {
  @Field(() => Number)
  questionId: number;
}

@ObjectType()
export class UpdateApprovedStateOfMockExamQuestionOutput extends CoreOutput {
  @Field(() => Boolean)
  currentApprovedState?: boolean;
  @Field(() => Number)
  questionId?: number;
}
