import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ObjectType()
export class GetExamTitleWithFeedbackTitle {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  title: string;
}

@ObjectType()
export class GetExamTitleWithFeedbackOutput extends CoreOutput {
  @Field(() => [GetExamTitleWithFeedbackTitle])
  titles?: GetExamTitleWithFeedbackTitle[];
}
