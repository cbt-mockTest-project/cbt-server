import { User } from 'src/users/entities/user.entity';
import { EditMockExamQuestionBookmarkInput, EditMockExamQuestionBookmarkOutput } from './dtos/editMockExamQuestionBookmark.dto';
import { MockExamQuestionBookmarkSerivce } from './mock-exams-question-bookmark.service';
import { ReadMockExamQuestionBookmarkOutput, ReadMockExamQuestionBookmarkInput } from './dtos/readMockExamQuestionBookmark.dto';
import { ReadExamTitleAndIdOfBookmarkedQuestionOutput } from './dtos/readExamTitleAndIdOfBookmarkedQuestion.dto';
export declare class MockExamQuestionBookmarkResolver {
    private readonly mockExamQuestionBookmarkSerivce;
    constructor(mockExamQuestionBookmarkSerivce: MockExamQuestionBookmarkSerivce);
    editMockExamQuestionBookmark(editMockExamQuestionBookmarkInput: EditMockExamQuestionBookmarkInput, user: User): Promise<EditMockExamQuestionBookmarkOutput>;
    readMockExamQuestionBookmark(readMockExamQuestionBookmarkInput: ReadMockExamQuestionBookmarkInput, user: User): Promise<ReadMockExamQuestionBookmarkOutput>;
    readExamTitleAndIdOfBookmarkedQuestion(user: User): Promise<ReadExamTitleAndIdOfBookmarkedQuestionOutput>;
}
