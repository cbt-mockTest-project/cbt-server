import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ExamViewer } from '../entities/exam-viewer.entity';

@InputType()
export class GetExamCategoryViewrsInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class GetExamCategoryViewrsOutput extends CoreOutput {
  @Field(() => [ExamViewer], { nullable: true })
  examViewers?: ExamViewer[];
}
