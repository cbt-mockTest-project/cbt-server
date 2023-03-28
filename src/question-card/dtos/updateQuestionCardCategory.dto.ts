import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { QuestionCardCategory } from '../entities/question-card-category';

@InputType()
export class UpdateQuestionCardCategoryInput {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
}

@ObjectType()
export class UpdateQuestionCardCategoryOutput extends CoreOutput {
  @Field(() => QuestionCardCategory, { nullable: true })
  category?: QuestionCardCategory;
}
