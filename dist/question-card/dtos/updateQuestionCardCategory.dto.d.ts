import { CoreOutput } from 'src/common/dtos/output.dto';
import { QuestionCardCategory } from '../entities/question-card-category';
export declare class UpdateQuestionCardCategoryInput {
    id: number;
    name: string;
}
export declare class UpdateQuestionCardCategoryOutput extends CoreOutput {
    category?: QuestionCardCategory;
}
