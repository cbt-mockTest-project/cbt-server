import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ExamSource, ExamStatus } from 'src/enums/enum';

@ObjectType()
export class ExamTitleAndId {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  title: string;
  @Field(() => String, { nullable: true })
  slug?: string;
  @Field(() => ExamStatus)
  status: ExamStatus;
  @Field(() => Number)
  order: number;
}
@InputType()
export class ReadMockExamTitlesByCateoryInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  all?: boolean;
  @Field(() => ExamSource, {
    nullable: true,
    defaultValue: ExamSource.MOUD_CBT,
  })
  source?: ExamSource;
}

@ObjectType()
export class ReadMockExamTitlesByCateoryOutput extends CoreOutput {
  @Field(() => [ExamTitleAndId])
  titles?: ExamTitleAndId[];
}
