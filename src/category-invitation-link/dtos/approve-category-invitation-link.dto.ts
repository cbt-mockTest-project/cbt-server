import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ExamType } from 'src/exam-category/entities/mock-exam-category.entity';

@InputType()
export class ApproveCategoryInvitationLinkInput {
  @Field(() => String)
  code: string;
}

@ObjectType()
export class ApproveCategoryInvitationLinkOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  categoryName?: string;
  @Field(() => String, { nullable: true })
  urlSlug?: string;
  @Field(() => ExamType, { nullable: true })
  examType?: ExamType;
}
