import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class MoveExamOrderInput {
  @Field(() => Number)
  categoryId: number;
  @Field(() => Number)
  startIdx: number;
  @Field(() => Number)
  endIdx: number;
}

@ObjectType()
export class MoveExamOrderOutput extends CoreOutput {}
