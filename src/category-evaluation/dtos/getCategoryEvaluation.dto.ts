import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CategoryEvaluation } from '../entities/category-evaluation.entity';

@InputType()
export class GetCategoryEvaluationInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class GetCategoryEvaluationOutput extends CoreOutput {
  @Field(() => [CategoryEvaluation], { nullable: true })
  categoryEvaluations?: CategoryEvaluation[];

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isEvaluated?: boolean;
}
