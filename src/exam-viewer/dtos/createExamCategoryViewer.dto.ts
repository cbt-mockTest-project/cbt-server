import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ExamViewer } from '../entities/exam-viewer.entity';

@InputType()
export class CreateExamCategoryViewerInput {
  @Field(() => Number)
  categoryId: number;
  @Field(() => Number)
  viewerId: number;
}

@ObjectType()
export class CreateExamCategoryViewerOutput extends CoreOutput {
  @Field(() => ExamViewer, { nullable: true })
  examViewer?: ExamViewer;
}
