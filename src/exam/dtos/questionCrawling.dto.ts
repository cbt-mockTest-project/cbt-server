import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class QuestionCrawlingInput {
  @Field((type) => Number)
  examId: number;
}

@ObjectType()
export class QuestionCrawlingOutput extends CoreOutput {}
