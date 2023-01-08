import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  InputType,
  PickType,
  ObjectType,
  Field,
  PartialType,
} from '@nestjs/graphql';
import { Notice } from '../entities/notice.entity';

@InputType()
export class EditNoticeInput extends PartialType(
  PickType(Notice, ['content', 'reservationTime', 'confirm']),
) {
  @Field(() => Number)
  noticeId: number;
}

@ObjectType()
export class EditNoticeOutput extends CoreOutput {}
