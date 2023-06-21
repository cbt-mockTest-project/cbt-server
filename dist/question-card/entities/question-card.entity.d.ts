import { User } from 'src/users/entities/user.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { QuestionCardCategory } from './question-card-category';
export declare class QuestionCard extends CoreEntity {
    question: string;
    solution: string;
    category: QuestionCardCategory;
    user: User;
}
