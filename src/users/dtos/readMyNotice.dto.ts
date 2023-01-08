import { Notice } from './../entities/notice.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class ReadMyNoticeOutput extends CoreOutput {
  @Field(() => [Notice], { nullable: true })
  notices?: Notice[];
}
