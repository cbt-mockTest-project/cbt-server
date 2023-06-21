import { CoreOutput } from 'src/common/dtos/output.dto';
import { Todo } from '../entities/Todo.entity';
declare const CreateOrUpdateTodoInput_base: import("@nestjs/common").Type<Pick<Todo, "todoList" | "dateString">>;
export declare class CreateOrUpdateTodoInput extends CreateOrUpdateTodoInput_base {
}
export declare class CreateOrUpdateTodoOutput extends CoreOutput {
    todo?: Todo;
}
export {};
