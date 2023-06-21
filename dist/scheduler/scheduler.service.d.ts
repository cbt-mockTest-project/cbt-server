import { TelegramService } from './../telegram/telegram.service';
import { MockExamQuestion } from './../mock-exams/entities/mock-exam-question.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CrawlerService } from 'src/crawler/crawler.service';
import { VisitService } from 'src/visit/visit.service';
import { UserService } from 'src/users/user.service';
export declare class SchedulerService {
    private readonly mockExamQuestions;
    private readonly configService;
    private readonly crawlerService;
    private readonly visitService;
    private readonly telegramService;
    private readonly userService;
    constructor(mockExamQuestions: Repository<MockExamQuestion>, configService: ConfigService, crawlerService: CrawlerService, visitService: VisitService, telegramService: TelegramService, userService: UserService);
    clearVisit(): Promise<void>;
}
