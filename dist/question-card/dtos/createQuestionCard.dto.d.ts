import { QuestionCard } from './../entities/question-card.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class CreateQuestionCardInput {
    question: string;
    solution: string;
    categoryId: number;
}
export declare class CreateQuestionCardOutput extends CoreOutput {
    questionCard?: QuestionCard;
}
