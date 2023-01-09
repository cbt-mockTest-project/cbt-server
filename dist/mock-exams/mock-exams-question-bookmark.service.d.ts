import { EditMockExamQuestionBookmarkInput, EditMockExamQuestionBookmarkOutput } from './dtos/editMockExamQuestionBookmark.dto';
import { User } from 'src/users/entities/user.entity';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { MockExamQuestionBookmark } from './entities/mock-exam-question-bookmark.entity';
import { Repository } from 'typeorm';
import { ReadMockExamQuestionBookmarkInput, ReadMockExamQuestionBookmarkOutput } from './dtos/readMockExamQuestionBookmark.dto';
import { ReadExamTitleAndIdOfBookmarkedQuestionOutput } from './dtos/readExamTitleAndIdOfBookmarkedQuestion.dto';
export declare class MockExamQuestionBookmarkSerivce {
    private readonly mockExamQuestionBookmark;
    private readonly mockExamQuestion;
    private readonly users;
    constructor(mockExamQuestionBookmark: Repository<MockExamQuestionBookmark>, mockExamQuestion: Repository<MockExamQuestion>, users: Repository<User>);
    editMockExamQuestionBookmark(editMockExamQuestionBookmarkInput: EditMockExamQuestionBookmarkInput, user: User): Promise<EditMockExamQuestionBookmarkOutput>;
    readMockExamQuestionBookmark(readMockExamQuestionBookmarkInput: ReadMockExamQuestionBookmarkInput, user: User): Promise<ReadMockExamQuestionBookmarkOutput>;
    readExamTitleAndIdOfBookmarkedQuestion(user: User): Promise<ReadExamTitleAndIdOfBookmarkedQuestionOutput>;
}
