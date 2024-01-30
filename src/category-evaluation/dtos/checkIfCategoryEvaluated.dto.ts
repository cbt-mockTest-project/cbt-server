import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CheckIfCategoryEvaluatedInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class CheckIfCategoryEvaluatedOutput extends CoreOutput {
  @Field(() => Boolean, { nullable: true })
  isEvaluated?: boolean;
}
