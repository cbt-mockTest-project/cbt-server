import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ExamViewer } from '../entities/exam-viewer.entity';

@InputType()
export class GetInvitedExamsInput {}

@ObjectType()
export class GetInvitedExamsOutput extends CoreOutput {
  @Field(() => [ExamViewer], { nullable: true })
  examViewers?: ExamViewer[];
}
