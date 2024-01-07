import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class GetExamCategorySubscribersInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class GetExamCategorySubscribersOutput extends CoreOutput {
  @Field(() => [User], { nullable: true, defaultValue: [] })
  users?: User[];
}
