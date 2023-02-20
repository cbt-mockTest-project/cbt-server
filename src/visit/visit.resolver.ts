import { User } from './../users/entities/user.entity';
import { AuthUser } from './../auth/auth-user.decorator';
import { Mutation, Resolver, Query } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Visit } from './entities/visit.entity';
import { VisitService } from './visit.service';
import { ReadVisitCountOutput } from './dtos/readVisitCount.dto';

@Resolver(() => Visit)
export class VisitResolver {
  constructor(private readonly visitService: VisitService) {}

  @Mutation(() => CoreOutput)
  async createVisit(@AuthUser() user: User): Promise<CoreOutput> {
    return this.visitService.createVisit(user);
  }

  @Query(() => ReadVisitCountOutput)
  async readVisitCount(): Promise<ReadVisitCountOutput> {
    return this.visitService.readVisitCount();
  }
}
