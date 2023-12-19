import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ReadMockExamCategoryIdsInput {}

@ObjectType()
export class ReadMockExamCategoryIdsOutput extends CoreOutput {
  @Field(() => [Number], { nullable: true })
  ids?: number[];
}
