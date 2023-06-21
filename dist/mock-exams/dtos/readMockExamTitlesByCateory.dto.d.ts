import { UserRole } from './../../users/entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamCategory } from '../entities/mock-exam-category.entity';
import { ExamStatus } from '../entities/mock-exam.entity';
export declare class ExamTitleAndId {
    id: number;
    title: string;
    slug?: string;
    status: ExamStatus;
    role: UserRole;
}
declare const ReadMockExamTitlesByCateoryInput_base: import("@nestjs/common").Type<Pick<MockExamCategory, "name">>;
export declare class ReadMockExamTitlesByCateoryInput extends ReadMockExamTitlesByCateoryInput_base {
    all?: boolean;
}
export declare class ReadMockExamTitlesByCateoryOutput extends CoreOutput {
    titles?: ExamTitleAndId[];
}
export {};
