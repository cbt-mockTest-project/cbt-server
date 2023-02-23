import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateNoticeForAllUsersInput {
  @Field(() => String)
  content: string;
  @Field(() => String, { nullable: true })
  link: string;
}

@ObjectType()
export class CreateNoticeForAllUsersOutput extends CoreOutput {}
