import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class GetUserByNicknameOrEmailInput {
  @Field(() => String)
  keyword: string;
}

@ObjectType()
export class GetUserByNicknameOrEmailOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
