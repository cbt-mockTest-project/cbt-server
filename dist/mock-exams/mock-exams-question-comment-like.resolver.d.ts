import { ReadMockExamQuestionCommentLikesByQuestinIdOutput, ReadMockExamQuestionCommentLikesByQuestinIdInput } from './dtos/readMockExamQuestionCommentLikesByQuestinId.dto';
import { User } from 'src/users/entities/user.entity';
import { MockExamQuestionCommentLikeSerivce } from './mock-exams-question-comment-like.service';
import { EditMockExamQuestionCommentLikeInput, EditMockExamQuestionCommentLikeOutput } from './dtos/editMockExamQuestionCommentLike.dto';
export declare class MockExamQuestionCommentLikeResolver {
    private readonly mockExamQuestionCommentLikeSerivce;
    constructor(mockExamQuestionCommentLikeSerivce: MockExamQuestionCommentLikeSerivce);
    editMockExamQuestionCommentLike(editMockExamQuestionCommentLikeInput: EditMockExamQuestionCommentLikeInput, user: User): Promise<EditMockExamQuestionCommentLikeOutput>;
    readMockExamQuestionCommentLikesByQuestinId(readMockExamQuestionCommentLikesByQuestinIdInput: ReadMockExamQuestionCommentLikesByQuestinIdInput): Promise<ReadMockExamQuestionCommentLikesByQuestinIdOutput>;
}
