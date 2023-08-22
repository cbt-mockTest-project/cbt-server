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
  code?: string;
}
