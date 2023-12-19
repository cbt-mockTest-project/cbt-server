import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateExamCategoryInvitationInput {
  @Field(() => Number)
  categoryId: number;

  @Field(() => Number)
  userIdForInvitation: number;
}

@ObjectType()
export class CreateExamCategoryInvitationOutput extends CoreOutput {}
