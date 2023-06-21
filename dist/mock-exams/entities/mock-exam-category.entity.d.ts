import { ExamCoAuthor } from './../../exam-co-author/entities/exam-co-author.entity';
import { User } from 'src/users/entities/user.entity';
import { MockExam } from './mock-exam.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Role } from 'src/users/entities/role.entity';
import { Partner } from 'src/partners/entities/partners.entity';
export declare enum MockExamCategoryTypes {
    written = "written",
    practical = "practical"
}
export declare class MockExamCategory extends CoreEntity {
    name: string;
    mockExam: MockExam[];
    type: MockExamCategoryTypes;
    approved: boolean;
    user: User;
    partner: Partner;
    examCoAuthor: ExamCoAuthor[];
    roles: Role[];
    order: number;
}
export declare class ExamCategoryRole extends CoreEntity {
    role: Role;
    mockExamCategory: MockExamCategory;
}
