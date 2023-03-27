import { User } from 'src/users/entities/user.entity';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import {
  CreateMockExamHistoryInput,
  CreateMockExamHistoryOutput,
} from './dtos/createMockExamHistory';
import { ReadMyExamHistoryOutput } from './dtos/readMyExamHistory.dto';
import { MockExamHistory } from './entities/mock-exam-history';
import { MockExamHistoryService } from './mock-exams-history.service';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorators';

@Resolver(() => MockExamHistory)
export class MockExamHistoryResolver {
  constructor(
    private readonly mockExamHistoryService: MockExamHistoryService,
  ) {}

  @Role(['ANY'])
  @Mutation(() => CreateMockExamHistoryOutput)
  createMockExamHistory(
    @Args('input')
    createMockExamHistoryInput: CreateMockExamHistoryInput,
    @AuthUser()
    user: User,
  ): Promise<CreateMockExamHistoryOutput> {
    return this.mockExamHistoryService.createMockExamHistory(
      createMockExamHistoryInput,
      user,
    );
  }

  @Role(['ANY'])
  @Query(() => ReadMyExamHistoryOutput)
  readMyExamHistory(
    @AuthUser()
    user: User,
  ): Promise<ReadMyExamHistoryOutput> {
    return this.mockExamHistoryService.readMyExamHistory(user);
  }
}
