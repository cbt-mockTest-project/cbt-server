import { User } from 'src/users/entities/user.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExam } from './mock-exam.entity';
export declare class MockExamHistory extends CoreEntity {
    exam: MockExam;
    user: User;
}
