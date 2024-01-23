import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CategoryEvaluation } from '../entities/category-evaluation.entity';

@InputType()
export class UpdateCategoryEvaluationInput extends PartialType(
  PickType(CategoryEvaluation, ['feedback', 'isSecret', 'score']),
) {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class UpdateCategoryEvaluationOutput extends CoreOutput {}
