import { QuestionCardCategory } from 'src/question-card/entities/question-card-category';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class CreateQuestionCardCategoryInput {
    name: string;
}
export declare class CreateQuestionCardCategoryOutput extends CoreOutput {
    category?: QuestionCardCategory;
}
