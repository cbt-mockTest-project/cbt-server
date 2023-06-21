import { MockExamQuestionComment } from './entities/mock-exam-question-comment.entity';
import { ReadMockExamQuestionCommentLikesByQuestinIdInput, ReadMockExamQuestionCommentLikesByQuestinIdOutput } from './dtos/readMockExamQuestionCommentLikesByQuestinId.dto';
import { User } from 'src/users/entities/user.entity';
import { MockExamQuestionCommentLike } from './entities/mock-exam-question-comment-like.entity';
import { Repository } from 'typeorm';
import { EditMockExamQuestionCommentLikeInput, EditMockExamQuestionCommentLikeOutput } from './dtos/editMockExamQuestionCommentLike.dto';
export declare class MockExamQuestionCommentLikeSerivce {
    private readonly mockExamQuestionCommentLike;
    private readonly mockExamQuestionComment;
    private readonly users;
    constructor(mockExamQuestionCommentLike: Repository<MockExamQuestionCommentLike>, mockExamQuestionComment: Repository<MockExamQuestionComment>, users: Repository<User>);
    editMockExamQuestionCommentLike(editMockExamQuestionCommentLikeInput: EditMockExamQuestionCommentLikeInput, user: User): Promise<EditMockExamQuestionCommentLikeOutput>;
    readMockExamQuestionCommentLikesByQuestinId(readMockExamQuestionCommentLikesByQuestinIdInput: ReadMockExamQuestionCommentLikesByQuestinIdInput): Promise<ReadMockExamQuestionCommentLikesByQuestinIdOutput>;
}
