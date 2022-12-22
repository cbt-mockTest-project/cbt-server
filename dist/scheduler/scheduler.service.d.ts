import { MockExamQuestion } from './../mock-exams/entities/mock-exam-question.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
export declare class SchedulerService {
    private readonly mockExamQuestions;
    private readonly configService;
    constructor(mockExamQuestions: Repository<MockExamQuestion>, configService: ConfigService);
    clearS3(): Promise<void>;
}
