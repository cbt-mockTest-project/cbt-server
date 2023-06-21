import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
export declare class TodoList {
    todo: string;
    isDone: boolean;
}
export declare class Todo extends CoreEntity {
    todoList: TodoList[];
    dateString: string;
    user: User;
}
