import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Todo } from './entities/Todo.entity';
import { TodoService } from './todo.service';
import {
  CreateOrUpdateTodoInput,
  CreateOrUpdateTodoOutput,
} from './dtos/createOrUpdateTodo';
import { Role } from 'src/auth/role.decorators';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { GetTodoInput, GetTodoOutput } from './dtos/getTodo';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => CreateOrUpdateTodoOutput)
  @Role(['ANY'])
  createOrUpdateTodo(
    @AuthUser() user: User,
    @Args('input') createOrUpdateTodoInput: CreateOrUpdateTodoInput,
  ) {
    return this.todoService.createOrUpdateTodo(createOrUpdateTodoInput, user);
  }

  @Query(() => GetTodoOutput)
  @Role(['ANY'])
  getTodo(@AuthUser() user: User, @Args('input') getTodoInput: GetTodoInput) {
    return this.todoService.getTodo(getTodoInput, user);
  }
}
