import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CategoryEvaluation } from '../entities/category-evaluation.entity';

@InputType()
export class CreateCategoryEvaluationInput extends PickType(
  CategoryEvaluation,
  ['score', 'feedback', 'isSecret'],
) {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class CreateCategoryEvaluationOutput extends CoreOutput {}
