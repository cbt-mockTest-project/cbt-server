import { MockExam } from './mock-exam.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { MockExamQuestionFeedback } from './mock-exam-question-feedback.entity';
import { MockExamQuestionState } from './mock-exam-question-state.entity';
import { MockExamQuestionComment } from './mock-exam-question-comment.entity';
import { MockExamQuestionBookmark } from './mock-exam-question-bookmark.entity';
import { MockExamQuestionMultipleChoice } from './mock-exam-question-multiple-choice.entity';
import { User } from 'src/users/entities/user.entity';
export declare class MockExamImageType {
    url: string;
    name: string;
    uid: string;
}
export declare class MockExamVideoType {
    url: string;
    size: number;
}
export declare class MockExamQuestion extends CoreEntity {
    question: string;
    solution?: string;
    approved: boolean;
    question_video: MockExamVideoType[];
    question_img: MockExamImageType[];
    solution_img: MockExamImageType[];
    mockExam: MockExam;
    mockExamId: number;
    mockExamQuestionFeedback: MockExamQuestionFeedback[];
    mockExamQuestionComment: MockExamQuestionComment[];
    state: MockExamQuestionState[];
    multipleChoice: MockExamQuestionMultipleChoice[];
    number: number;
    mockExamQuestionBookmark: MockExamQuestionBookmark[];
    user: User;
}
