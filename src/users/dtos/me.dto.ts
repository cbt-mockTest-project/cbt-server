import { User } from 'src/users/entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MeOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
