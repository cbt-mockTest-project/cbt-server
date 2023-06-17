import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Todo } from '../entities/Todo.entity';

@InputType()
export class GetTodoInput {
  @Field(() => String)
  dateString: string;
}

@ObjectType()
export class GetTodoOutput extends CoreOutput {
  @Field(() => Todo, { nullable: true })
  todo?: Todo;
}
