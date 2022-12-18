import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ChangePasswordAfterVerifyingInput {
  @Field(() => String)
  code: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class ChangePasswordAfterVerifyingOutput extends CoreOutput {}
