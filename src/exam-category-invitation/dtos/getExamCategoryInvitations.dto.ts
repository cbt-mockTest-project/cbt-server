import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ExamCategoryInvitation } from '../entities/exam-category-invitation.entity';

@InputType()
export class GetExamCategoryInvitationsInput {}

@ObjectType()
export class GetExamCategoryInvitationsOutput extends CoreOutput {
  @Field(() => [ExamCategoryInvitation], { nullable: true })
  invitations?: ExamCategoryInvitation[];
}
