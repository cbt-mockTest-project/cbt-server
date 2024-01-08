import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetMyAllExamCategoriesLearningProgressInput {}

@ObjectType()
export class GetMyAllExamCategoriesLearningProgressOutput extends CoreOutput {
  @Field(() => Number, { nullable: true, defaultValue: 0 })
  totalQuestionCount?: number;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  highScoreCount?: number;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  lowScoreCount?: number;
}
