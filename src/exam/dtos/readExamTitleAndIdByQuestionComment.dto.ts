import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExamTitleAndIdByQuestionComment {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  title: string;
}

@ObjectType()
export class ReadExamTitleAndIdByQuestionCommentOutput extends CoreOutput {
  @Field(() => [ExamTitleAndIdByQuestionComment], { nullable: true })
  examTitleAndId?: ExamTitleAndIdByQuestionComment[];
}
