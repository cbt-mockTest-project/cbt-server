import { Todo } from './entities/Todo.entity';
import { Repository } from 'typeorm';
import { CreateOrUpdateTodoInput, CreateOrUpdateTodoOutput } from './dtos/createOrUpdateTodo';
import { User } from 'src/users/entities/user.entity';
import { GetTodoInput, GetTodoOutput } from './dtos/getTodo';
export declare class TodoService {
    private readonly todo;
    constructor(todo: Repository<Todo>);
    getTodo(getTodoInput: GetTodoInput, user: User): Promise<GetTodoOutput>;
    createOrUpdateTodo(createOrUpdateTodoInput: CreateOrUpdateTodoInput, user: User): Promise<CreateOrUpdateTodoOutput>;
}
