import { CoreOutput } from 'src/common/dtos/output.dto';
import { Todo } from '../entities/Todo.entity';
export declare class GetTodoInput {
    dateString: string;
}
export declare class GetTodoOutput extends CoreOutput {
    todo?: Todo;
}
