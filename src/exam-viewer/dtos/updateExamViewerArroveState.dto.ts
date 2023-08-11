import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpdateExamViewerArroveStateInput {
  @Field(() => Number)
  examViewerId: number;
}

@ObjectType()
export class UpdateExamViewerArroveStateOutput extends CoreOutput {}
