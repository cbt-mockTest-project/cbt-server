import { CoreOutput } from 'src/common/dtos/output.dto';
import { InputType, PickType, ObjectType, Field } from '@nestjs/graphql';
import { Notice } from '../entities/notice.entity';

@InputType()
export class CreateNoticeInput extends PickType(Notice, [
  'content',
  'reservationTime',
]) {
  @Field(() => Number)
  userId: number;
}

@ObjectType()
export class CreateNoticeOutput extends CoreOutput {}
