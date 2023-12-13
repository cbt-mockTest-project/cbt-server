import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class AddExamToCategoryInput {
  @Field(() => Number)
  categoryId: number;
  @Field(() => Number)
  examId: number;
}

@ObjectType()
export class AddExamToCategoryOutput extends CoreOutput {}
