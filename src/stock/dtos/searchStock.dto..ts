import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class SearchStockInput {
  @Field(() => String)
  keyword: string;
}

@ObjectType()
export class SearchStockOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  시가총액?: string;
  @Field(() => String, { nullable: true })
  현재가?: string;
  @Field(() => String, { nullable: true })
  상승률?: string;
  @Field(() => String, { nullable: true })
  고가?: string;
  @Field(() => String, { nullable: true })
  저가?: string;
  @Field(() => String, { nullable: true })
  거래량?: string;
}
