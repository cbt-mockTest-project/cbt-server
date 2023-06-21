import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';
export declare class SearchUserInput {
    name: string;
}
export declare class SearchUserOutput extends CoreOutput {
    users?: User[];
}
