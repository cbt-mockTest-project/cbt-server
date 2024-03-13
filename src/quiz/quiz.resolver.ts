import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Quiz } from './entities/quiz.entity';
import { QuizService } from './quiz.service';
import { CreateQuizInput, CreateQuizOutput } from './dtos/createQuiz.dto';
import { Role } from 'src/auth/role.decorators';
import { GetQuizsInput, GetQuizsOutput } from './dtos/getQuizs.dto';

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(private readonly quizService: QuizService) {}

  @Mutation(() => CreateQuizOutput)
  @Role(['ANY'])
  createQuiz(
    @Args('input') createQuizInput: CreateQuizInput,
  ): Promise<CreateQuizOutput> {
    return this.quizService.createQuiz(createQuizInput);
  }

  @Query(() => GetQuizsOutput)
  getQuizs(
    @Args('input') getQuizsInput: GetQuizsInput,
  ): Promise<GetQuizsOutput> {
    return this.quizService.getQuizs(getQuizsInput);
  }
}
