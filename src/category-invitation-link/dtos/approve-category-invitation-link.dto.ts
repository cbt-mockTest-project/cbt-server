import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ApproveCategoryInvitationLinkInput {
  @Field(() => String)
  code: string;
}

@ObjectType()
export class ApproveCategoryInvitationLinkOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  categoryName?: string;
}
