import { User } from 'src/users/entities/user.entity';
import { ReadAllMockExamQuestionFeedbackOutput } from './dtos/readAllMockExamQuestionFeedback.dto';
import { EditMockExamQuestionFeedbackInput, EditMockExamQuestionFeedbackOutput } from './dtos/editMockExamQuestionFeedback.dto';
import { CreateMockExamQuestionFeedbackInput, CreateMockExamQuestionFeedbackOutput } from './dtos/createMockExamQuestionFeedback.dto';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { MockExamQuestionFeedback } from './entities/mock-exam-question-feedback.entity';
import { Repository } from 'typeorm';
import { DeleteMockExamQuestionFeedbackInput, DeleteMockExamQuestionFeedbackOutput } from './dtos/deleteMockExamQuestionFeedback.dto';
export declare class MockExamQuestionFeedbackSerivce {
    private readonly mockExamQuestionFeedback;
    private readonly mockExamQuestion;
    private readonly users;
    constructor(mockExamQuestionFeedback: Repository<MockExamQuestionFeedback>, mockExamQuestion: Repository<MockExamQuestion>, users: Repository<User>);
    createMockExamQuestionFeedback(createMockExamQuestionFeedbackInput: CreateMockExamQuestionFeedbackInput, user: User): Promise<CreateMockExamQuestionFeedbackOutput>;
    editMockExamQuestionFeedback(editMockExamQuestionFeedbackInput: EditMockExamQuestionFeedbackInput): Promise<EditMockExamQuestionFeedbackOutput>;
    deleteMockExamQuestionFeedback(deleteMockExamQuestionFeedbackInput: DeleteMockExamQuestionFeedbackInput): Promise<DeleteMockExamQuestionFeedbackOutput>;
    readAllMockExamQuestionFeedback(): Promise<ReadAllMockExamQuestionFeedbackOutput>;
}
