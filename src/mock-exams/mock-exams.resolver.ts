import { ReadAllMockExamsOutput } from './dtos/readAllMockExam.dto';
import {
  CreateMockExamOutput,
  CreateMockExamInput,
} from './dtos/createMockExam.dto';
import { MockExam } from './entities/mock-exam.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MockExamService } from './mock-exams.service';
import { Role } from 'src/auth/role.decorators';
import { EditMockExamOutput, EditMockExamInput } from './dtos/editMockExam.dto';
import {
  DeleteMockExamInput,
  DeleteMockExamOutput,
} from './dtos/deleteMockExam.dto';
import {
  SearchMockExamOutput,
  SearchMockExamInput,
} from './dtos/searchMockExam.dto';

@Resolver(() => MockExam)
export class MockExamResolver {
  constructor(private readonly mockExamService: MockExamService) {}
  @Mutation(() => CreateMockExamOutput)
  @Role(['ADMIN'])
  createMockExam(
    @Args('input') createMockExamInput: CreateMockExamInput,
  ): Promise<CreateMockExamOutput> {
    return this.mockExamService.createMockExam(createMockExamInput);
  }

  @Mutation(() => EditMockExamOutput)
  @Role(['ADMIN'])
  editMockExam(
    @Args('input') editMockExamInput: EditMockExamInput,
  ): Promise<EditMockExamOutput> {
    return this.mockExamService.editMockExam(editMockExamInput);
  }

  @Mutation(() => DeleteMockExamOutput)
  @Role(['ADMIN'])
  deleteMockExam(
    @Args('input') deleteMockExamInput: DeleteMockExamInput,
  ): Promise<DeleteMockExamOutput> {
    return this.mockExamService.deleteMockExam(deleteMockExamInput);
  }

  @Query(() => ReadAllMockExamsOutput)
  readAllMockExam(): Promise<ReadAllMockExamsOutput> {
    return this.mockExamService.readAllMockExam();
  }

  @Query(() => SearchMockExamOutput)
  searchMockExam(
    @Args('input') searchMockExamInput: SearchMockExamInput,
  ): Promise<SearchMockExamOutput> {
    return this.mockExamService.searchMockExam(searchMockExamInput);
  }
}
