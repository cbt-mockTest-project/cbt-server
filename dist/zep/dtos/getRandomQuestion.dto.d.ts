import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamQuestion } from '../../mock-exams/entities/mock-exam-question.entity';
export declare class GetRandomQuestionInput {
}
export declare class GetRandomQuestionOutput extends CoreOutput {
    question?: MockExamQuestion;
}
