import { MockExamCategory } from './../../mock-exams/entities/mock-exam-category.entity';
import { User } from 'src/users/entities/user.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExam } from 'src/mock-exams/entities/mock-exam.entity';
export declare class ExamCoAuthor extends CoreEntity {
    user: User;
    exam: MockExam;
    examCategory: MockExamCategory;
}
