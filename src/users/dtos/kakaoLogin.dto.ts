import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class KakaoLoginInput {
  @Field(() => String)
  code: string;
}

@ObjectType()
export class KakaoLoginOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
