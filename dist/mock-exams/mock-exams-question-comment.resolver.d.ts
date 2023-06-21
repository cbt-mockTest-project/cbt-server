import { ReadMyQuestionCommentsOutput, ReadMyQuestionCommentsInput } from './dtos/readMyQuestionComments.dto';
import { ReadMockExamQuestionCommentsByQuestionIdOutput, ReadMockExamQuestionCommentsByQuestionIdInput } from './dtos/readMockExamQuestionCommentsByQuestinId.dto';
import { User } from 'src/users/entities/user.entity';
import { DeleteMockExamQuestionCommentInput, DeleteMockExamQuestionCommentOutput } from './dtos/deleteMockExamQuestionComment.dto';
import { MockExamQuestionCommentSerivce } from './mock-exams-question-comment.service';
import { CreateMockExamQuestionCommentInput, CreateMockExamQuestionCommentOutput } from './dtos/createMockExamQuestionComment.dto';
import { EditMockExamQuestionCommentInput, EditMockExamQuestionCommentOutput } from './dtos/editMockExamQuestionComment.dto';
import { ReadExamTitleAndIdByQuestionCommentOutput } from './dtos/readExamTitleAndIdByQuestionComment.dto';
export declare class MockExamQuestionCommentResolver {
    private readonly mockExamQuestionCommentSerivce;
    constructor(mockExamQuestionCommentSerivce: MockExamQuestionCommentSerivce);
    createMockExamQuestionComment(createMockExamQuestionCommentInput: CreateMockExamQuestionCommentInput, user: User): Promise<CreateMockExamQuestionCommentOutput>;
    editMockExamQuestionComment(editMockExamQuestionCommentInput: EditMockExamQuestionCommentInput, user: User): Promise<EditMockExamQuestionCommentOutput>;
    deleteMockExamQuestionComment(deleteMockExamQuestionCommentInput: DeleteMockExamQuestionCommentInput, user: User): Promise<DeleteMockExamQuestionCommentOutput>;
    readMockExamQuestionCommentsByQuestionId(readMockExamQuestionCommentsByQuestionIdInput: ReadMockExamQuestionCommentsByQuestionIdInput, user: User): Promise<ReadMockExamQuestionCommentsByQuestionIdOutput>;
    readMyQuestionComments(readMyQuestionCommentsInput: ReadMyQuestionCommentsInput, user: User): Promise<ReadMyQuestionCommentsOutput>;
    readExamTitleAndIdByQuestionComment(user: User): Promise<ReadExamTitleAndIdByQuestionCommentOutput>;
}
