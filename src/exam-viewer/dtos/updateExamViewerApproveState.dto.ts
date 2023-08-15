import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpdateExamViewerApproveStateInput {
  @Field(() => Number)
  examViewerId: number;
}

@ObjectType()
export class UpdateExamViewerApproveStateOutput extends CoreOutput {}
