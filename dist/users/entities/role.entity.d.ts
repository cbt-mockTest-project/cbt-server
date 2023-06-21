import { CoreEntity } from 'src/common/entities/core.entity';
import { UserAndRole } from './userAndRole.entity';
import { MockExamCategory } from 'src/mock-exams/entities/mock-exam-category.entity';
export declare class Role extends CoreEntity {
    name: string;
    userRoles: UserAndRole[];
    mockExamCategories: MockExamCategory[];
}
