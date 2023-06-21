import { CoreOutput } from 'src/common/dtos/output.dto';
import { QuestionCard } from '../entities/question-card.entity';
export declare class ReadMyQuestionCardsInput {
    categoryId?: number;
}
export declare class ReadMyQuestionCardsOutput extends CoreOutput {
    questionCards?: QuestionCard[];
}
