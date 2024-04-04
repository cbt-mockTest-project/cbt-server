import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ObjectType()
export class NaverKeywordSearchCount {
  @Field(() => String)
  relKeyword: string;

  @Field(() => Number)
  monthlyPcQcCnt: number;

  @Field(() => Number)
  monthlyMobileQcCnt: number;
}

@InputType()
export class GetKewordSearchCountInput {
  @Field(() => String)
  keyword: string;
}

@ObjectType()
export class GetKewordSearchCountOutput extends CoreOutput {
  @Field(() => [NaverKeywordSearchCount], { defaultValue: [], nullable: true })
  keywordList?: NaverKeywordSearchCount[];
}
