import { QuestionCardCategory } from 'src/question-card/entities/question-card-category';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class ReadMyQuestionCardCategoriesOutput extends CoreOutput {
    categories?: QuestionCardCategory[];
}
