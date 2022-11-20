import { CoreOutput } from './../../common/dtos/output.dto';
import { User } from './../entities/user.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class RegisterInput extends PickType(User, ['password', 'nickname']) {
  @Field(() => String)
  code: string;
}

@ObjectType()
export class RegisterOutput extends CoreOutput {}
