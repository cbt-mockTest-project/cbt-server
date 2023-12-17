import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ToggleExamLikeInput {
  @Field(() => Number)
  examId: number;
}

@ObjectType()
export class ToggleExamLikeOutput extends CoreOutput {
  @Field(() => Boolean, { nullable: true })
  isLiked?: boolean;
}
