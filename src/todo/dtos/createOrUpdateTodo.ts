import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Todo } from '../entities/Todo.entity';

@InputType()
export class CreateOrUpdateTodoInput extends PickType(Todo, [
  'todoList',
  'dateString',
]) {}

@ObjectType()
export class CreateOrUpdateTodoOutput extends CoreOutput {
  @Field(() => Todo, { nullable: true })
  todo?: Todo;
}
