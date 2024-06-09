import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CheckIsAccessibleCategoryInput {
  @Field(() => Number)
  examId: number;
}

@ObjectType()
export class CheckIsAccessibleCategoryOutput extends CoreOutput {}
