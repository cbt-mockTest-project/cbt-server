import { CreateMockExamQuestionMultipleChoiceInput, CreateMockExamQuestionMultipleChoiceOutput } from './dtos/createMockExamQuestionMultipleChoice.dto';
import { MockExamQuestionMultipleChoiceService } from './mock-exams-question-multiple-choice.service';
export declare class MockExamQuestionMultipleChoiceResolver {
    private readonly mockExamQuestionMultipleChoiceService;
    constructor(mockExamQuestionMultipleChoiceService: MockExamQuestionMultipleChoiceService);
    createMutipleChoice(createMockExamQuestionMultipleChoiceInput: CreateMockExamQuestionMultipleChoiceInput): Promise<CreateMockExamQuestionMultipleChoiceOutput>;
}
