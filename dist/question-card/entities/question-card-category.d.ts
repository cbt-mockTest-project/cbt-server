import { CoreEntity } from 'src/common/entities/core.entity';
import { QuestionCard } from './question-card.entity';
import { User } from 'src/users/entities/user.entity';
export declare class QuestionCardCategory extends CoreEntity {
    questionCard: QuestionCard[];
    name: string;
    user: User;
}
