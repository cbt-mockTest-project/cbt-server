import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ReadMockExamCategoryNamesInput {}

@ObjectType()
export class ReadMockExamCategoryNamesOutput extends CoreOutput {
  @Field(() => [String], { nullable: true })
  names?: string[];
}
