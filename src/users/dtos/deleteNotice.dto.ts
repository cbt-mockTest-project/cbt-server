import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class DeleteNoticeInput {
  @Field(() => Number)
  noticeId: number;
}

@ObjectType()
export class DeleteNoticeOutput extends CoreOutput {}
