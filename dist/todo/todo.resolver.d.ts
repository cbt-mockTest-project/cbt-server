import { TodoService } from './todo.service';
import { CreateOrUpdateTodoInput, CreateOrUpdateTodoOutput } from './dtos/createOrUpdateTodo';
import { User } from 'src/users/entities/user.entity';
import { GetTodoInput, GetTodoOutput } from './dtos/getTodo';
export declare class TodoResolver {
    private readonly todoService;
    constructor(todoService: TodoService);
    createOrUpdateTodo(user: User, createOrUpdateTodoInput: CreateOrUpdateTodoInput): Promise<CreateOrUpdateTodoOutput>;
    getTodo(user: User, getTodoInput: GetTodoInput): Promise<GetTodoOutput>;
}
