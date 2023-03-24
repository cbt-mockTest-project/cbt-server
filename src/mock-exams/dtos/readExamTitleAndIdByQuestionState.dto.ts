import { TitleAndId } from './findMyExamHistory.dto';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReadExamTitleAndIdByQuestionStateOutput extends CoreOutput {
  @Field(() => [TitleAndId], { nullable: true })
  titleAndId?: TitleAndId[];
}
