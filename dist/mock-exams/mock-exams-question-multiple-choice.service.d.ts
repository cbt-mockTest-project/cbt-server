import { CreateMockExamQuestionMultipleChoiceInput, CreateMockExamQuestionMultipleChoiceOutput } from './dtos/createMockExamQuestionMultipleChoice.dto';
import { Repository } from 'typeorm';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { MockExamQuestionMultipleChoice } from './entities/mock-exam-question-multiple-choice.entity';
export declare class MockExamQuestionMultipleChoiceService {
    private readonly mockExamQuestionMultipleChoice;
    private readonly mockExamQuestion;
    constructor(mockExamQuestionMultipleChoice: Repository<MockExamQuestionMultipleChoice>, mockExamQuestion: Repository<MockExamQuestion>);
    createMutipleChoice(createMockExamQuestionMultipleChoiceInput: CreateMockExamQuestionMultipleChoiceInput): Promise<CreateMockExamQuestionMultipleChoiceOutput>;
}
