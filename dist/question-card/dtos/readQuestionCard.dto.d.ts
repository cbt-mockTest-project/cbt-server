import { CoreOutput } from 'src/common/dtos/output.dto';
import { QuestionCard } from '../entities/question-card.entity';
export declare class ReadQuestionCardInput {
    id: number;
}
export declare class ReadQuestionCardOutput extends CoreOutput {
    questionCard?: QuestionCard;
}
