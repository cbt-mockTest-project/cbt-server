import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateCategoryInvitationLinkInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class CreateCategoryInvitationLinkOutput extends CoreOutput {
  @Field(() => String, { nullable: true, defaultValue: '' })
  code?: string;
}
