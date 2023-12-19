import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ToggleExamBookmarkInput {
  @Field(() => Number)
  examId: number;
}

@ObjectType()
export class ToggleExamBookmarkOutput extends CoreOutput {
  @Field(() => Boolean, { nullable: true })
  isBookmarked?: boolean;
}
