import { MockExamQuestion } from 'src/mock-exams/entities/mock-exam-question.entity';
import { Repository } from 'typeorm';
import { GetRandomQuestionOutput } from './dtos/getRandomQuestion.dto';
export declare class ZepService {
    private readonly mockExamQuestion;
    constructor(mockExamQuestion: Repository<MockExamQuestion>);
    getRandomQuestion(categoryId: string): Promise<GetRandomQuestionOutput>;
}
