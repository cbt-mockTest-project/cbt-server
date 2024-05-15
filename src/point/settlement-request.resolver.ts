import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SettlementRequestService } from './settlement-request.service';
import { SettlementRequest } from './entities/settlement-request.entity';
import { GetSettlementRequestsOutput } from './dtos/settlement-request/get-settlement-requests.dto';
import { Role } from 'src/auth/role.decorators';
import {
  CreateSettlementRequestInput,
  CreateSettlementRequestOutput,
} from './dtos/settlement-request/create-settlement-request.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  UpdateSettlementRequestInput,
  UpdateSettlementRequestOutput,
} from './dtos/settlement-request/update-settlement-request.dto';
import { GetMySettlementRequestOutput } from './dtos/settlement-request/get-my-settlement-request.dto';
import { GetMySettlementRequestsOutput } from './dtos/settlement-request/get-my-settlement-requests.dto';

@Resolver(() => SettlementRequest)
export class SettlementRequestResolver {
  constructor(
    private readonly settlementRequestService: SettlementRequestService,
  ) {}

  @Role(['ADMIN'])
  @Query(() => GetSettlementRequestsOutput)
  async getSettlementRequests(): Promise<GetSettlementRequestsOutput> {
    return this.settlementRequestService.getSettlementRequests();
  }

  @Role(['ADMIN'])
  @Mutation(() => UpdateSettlementRequestOutput)
  async updateSettlementRequest(
    @Args('input') updateSettlementRequestInput: UpdateSettlementRequestInput,
  ): Promise<UpdateSettlementRequestOutput> {
    return this.settlementRequestService.updateSettlementRequest(
      updateSettlementRequestInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => CreateSettlementRequestOutput)
  async createSettlementRequest(
    @AuthUser() user: User,
    @Args('input') createSettlementRequestInput: CreateSettlementRequestInput,
  ): Promise<CreateSettlementRequestOutput> {
    return this.settlementRequestService.createSettlementRequest(
      user,
      createSettlementRequestInput,
    );
  }

  @Role(['ANY'])
  @Query(() => GetMySettlementRequestOutput)
  async getMySettlementRequest(
    @AuthUser() user: User,
  ): Promise<GetMySettlementRequestOutput> {
    return this.settlementRequestService.getMySettlementRequest(user);
  }

  @Role(['ANY'])
  @Query(() => GetMySettlementRequestsOutput)
  async getMySettlementRequests(
    @AuthUser() user: User,
  ): Promise<GetMySettlementRequestsOutput> {
    return this.settlementRequestService.getMySettlementRequest(user);
  }
}
