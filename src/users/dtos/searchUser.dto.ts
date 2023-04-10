import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class SearchUserInput {
  @Field(() => String)
  name: string;
}

@ObjectType()
export class SearchUserOutput extends CoreOutput {
  @Field(() => [User], { nullable: true })
  users?: User[];
}
