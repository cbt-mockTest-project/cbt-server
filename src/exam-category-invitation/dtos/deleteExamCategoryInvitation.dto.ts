import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteExamCategoryInvitationInput {
  @Field(() => Number)
  invitationId: number;
}

@ObjectType()
export class DeleteExamCategoryInvitationOutput extends CoreOutput {}
