import { ReadMockExamQuestionCommentsByQuestionIdOutput, ReadMockExamQuestionCommentsByQuestionIdInput } from './dtos/readMockExamQuestionCommentsByQuestinId.dto';
import { User } from 'src/users/entities/user.entity';
import { EditMockExamQuestionCommentInput, EditMockExamQuestionCommentOutput } from './dtos/editMockExamQuestionComment.dto';
import { CreateMockExamQuestionCommentInput, CreateMockExamQuestionCommentOutput } from './dtos/createMockExamQuestionComment.dto';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { MockExamQuestionComment } from './entities/mock-exam-question-comment.entity';
import { Repository } from 'typeorm';
import { DeleteMockExamQuestionCommentInput, DeleteMockExamQuestionCommentOutput } from './dtos/deleteMockExamQuestionComment.dto';
import { MockExamQuestionCommentLike } from './entities/mock-exam-question-comment-like.entity';
import { ReadMyQuestionCommentsInput, ReadMyQuestionCommentsOutput } from './dtos/readMyQuestionComments.dto';
import { ReadExamTitleAndIdByQuestionCommentOutput } from './dtos/readExamTitleAndIdByQuestionComment.dto';
import { MockExam } from './entities/mock-exam.entity';
export declare class MockExamQuestionCommentSerivce {
    private readonly mockExamQuestionCommentLike;
    private readonly mockExamQuestionComment;
    private readonly mockExamQuestion;
    private readonly mockExam;
    private readonly users;
    constructor(mockExamQuestionCommentLike: Repository<MockExamQuestionCommentLike>, mockExamQuestionComment: Repository<MockExamQuestionComment>, mockExamQuestion: Repository<MockExamQuestion>, mockExam: Repository<MockExam>, users: Repository<User>);
    createMockExamQuestionComment(createMockExamQuestionCommentInput: CreateMockExamQuestionCommentInput, user: User): Promise<CreateMockExamQuestionCommentOutput>;
    editMockExamQuestionComment(editMockExamQuestionCommentInput: EditMockExamQuestionCommentInput, user: User): Promise<EditMockExamQuestionCommentOutput>;
    deleteMockExamQuestionComment(deleteMockExamQuestionCommentInput: DeleteMockExamQuestionCommentInput, user: any): Promise<DeleteMockExamQuestionCommentOutput>;
    readMockExamQuestionCommentsByQuestionId(readMockExamQuestionCommentsByQuestionIdInput: ReadMockExamQuestionCommentsByQuestionIdInput, user: User): Promise<ReadMockExamQuestionCommentsByQuestionIdOutput>;
    readMyQuestionComments(readMyQuestionCommentsInput: ReadMyQuestionCommentsInput, user: User): Promise<ReadMyQuestionCommentsOutput>;
    readExamTitleAndIdByQuestionComment(user: User): Promise<ReadExamTitleAndIdByQuestionCommentOutput>;
}
