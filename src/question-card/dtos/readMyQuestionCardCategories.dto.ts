import { QuestionCardCategory } from 'src/question-card/entities/question-card-category';
import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ObjectType()
export class ReadMyQuestionCardCategoriesOutput extends CoreOutput {
  @Field(() => [QuestionCardCategory], { nullable: true })
  categories?: QuestionCardCategory[];
}
