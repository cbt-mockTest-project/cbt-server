import { QuestionCard } from './../entities/question-card.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class UpdateQuestionCardInput {
    question?: string;
    solution?: string;
    questionId: number;
}
export declare class UpdateQuestionCardOutput extends CoreOutput {
    questionCard?: QuestionCard;
}
