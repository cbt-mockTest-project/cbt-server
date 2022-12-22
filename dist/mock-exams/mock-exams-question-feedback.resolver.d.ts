import { User } from 'src/users/entities/user.entity';
import { DeleteMockExamQuestionFeedbackInput, DeleteMockExamQuestionFeedbackOutput } from './dtos/deleteMockExamQuestionFeedback.dto';
import { MockExamQuestionFeedbackSerivce } from './mock-exams-question-feedback.service';
import { CreateMockExamQuestionFeedbackInput, CreateMockExamQuestionFeedbackOutput } from './dtos/createMockExamQuestionFeedback.dto';
import { EditMockExamQuestionFeedbackInput, EditMockExamQuestionFeedbackOutput } from './dtos/editMockExamQuestionFeedback.dto';
import { ReadAllMockExamQuestionFeedbackOutput } from './dtos/readAllMockExamQuestionFeedback.dto';
export declare class MockExamQuestionFeedbackResolver {
    private readonly mockExamQuestionFeedbackSerivce;
    constructor(mockExamQuestionFeedbackSerivce: MockExamQuestionFeedbackSerivce);
    createMockExamQuestionFeedback(createMockExamQuestionFeedbackInput: CreateMockExamQuestionFeedbackInput, user: User): Promise<CreateMockExamQuestionFeedbackOutput>;
    editMockExamQuestionFeedback(editMockExamQuestionFeedbackInput: EditMockExamQuestionFeedbackInput): Promise<EditMockExamQuestionFeedbackOutput>;
    deleteMockExamQuestionFeedback(deleteMockExamQuestionFeedbackInput: DeleteMockExamQuestionFeedbackInput): Promise<DeleteMockExamQuestionFeedbackOutput>;
    readAllMockExamQuestionFeedback(): Promise<ReadAllMockExamQuestionFeedbackOutput>;
}
