import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class NaverViewTapCrawlerInput {
  @Field(() => String)
  keyword: string;

  @Field(() => String)
  blogName: string;

  @Field(() => String)
  category: string;
}

@ObjectType()
export class NaverViewTapCrawlerOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  message?: string;
}
