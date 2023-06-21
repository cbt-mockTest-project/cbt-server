import { User } from 'src/users/entities/user.entity';
import { DeleteMockExamQuestionFeedbackInput, DeleteMockExamQuestionFeedbackOutput } from './dtos/deleteMockExamQuestionFeedback.dto';
import { MockExamQuestionFeedbackSerivce } from './mock-exams-question-feedback.service';
import { CreateMockExamQuestionFeedbackInput, CreateMockExamQuestionFeedbackOutput } from './dtos/createMockExamQuestionFeedback.dto';
import { EditMockExamQuestionFeedbackInput, EditMockExamQuestionFeedbackOutput } from './dtos/editMockExamQuestionFeedback.dto';
import { ReadAllMockExamQuestionFeedbackOutput } from './dtos/readAllMockExamQuestionFeedback.dto';
import { GetExamTitleWithFeedbackOutput } from './dtos/getExamTitleWithFeedback.dto';
import { GetFeedbacksWithFilterInput, GetFeedbacksWithFilterOutput } from './dtos/getFeedbacksWithFilter.dto';
export declare class MockExamQuestionFeedbackResolver {
    private readonly mockExamQuestionFeedbackSerivce;
    constructor(mockExamQuestionFeedbackSerivce: MockExamQuestionFeedbackSerivce);
    createMockExamQuestionFeedback(createMockExamQuestionFeedbackInput: CreateMockExamQuestionFeedbackInput, user: User): Promise<CreateMockExamQuestionFeedbackOutput>;
    editMockExamQuestionFeedback(editMockExamQuestionFeedbackInput: EditMockExamQuestionFeedbackInput): Promise<EditMockExamQuestionFeedbackOutput>;
    deleteMockExamQuestionFeedback(user: User, deleteMockExamQuestionFeedbackInput: DeleteMockExamQuestionFeedbackInput): Promise<DeleteMockExamQuestionFeedbackOutput>;
    readAllMockExamQuestionFeedback(): Promise<ReadAllMockExamQuestionFeedbackOutput>;
    getExamTitleWithFeedback(user: User): Promise<GetExamTitleWithFeedbackOutput>;
    getFeedbacksWithFilter(getFeedbacksWithFilterInput: GetFeedbacksWithFilterInput, user: User): Promise<GetFeedbacksWithFilterOutput>;
}
