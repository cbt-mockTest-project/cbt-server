import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateQuizInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class CreateQuizOutput extends CoreOutput {}
