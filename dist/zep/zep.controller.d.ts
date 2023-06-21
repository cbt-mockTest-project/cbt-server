import { ZepService } from './zep.service';
export declare class ZepController {
    private readonly zepService;
    constructor(zepService: ZepService);
    getRandomQuestion(id: string): Promise<import("./dtos/getRandomQuestion.dto").GetRandomQuestionOutput>;
}
