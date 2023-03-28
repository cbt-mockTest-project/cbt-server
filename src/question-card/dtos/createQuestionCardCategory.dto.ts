import { QuestionCardCategory } from 'src/question-card/entities/question-card-category';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateQuestionCardCategoryInput {
  @Field(() => String)
  name: string;
}

@ObjectType()
export class CreateQuestionCardCategoryOutput extends CoreOutput {
  @Field(() => QuestionCardCategory, { nullable: true })
  category?: QuestionCardCategory;
}
