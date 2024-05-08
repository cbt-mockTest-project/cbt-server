import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PointTransaction } from './entities/point-transaction.entity';
import { PointTransactionService } from './point-transaction.service';
import {
  CreatePointTransactionInput,
  CreatePointTransactionOutput,
} from './dtos/point-transaction/create-point-transaction.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorators';

@Resolver(() => PointTransaction)
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
  ) {}

  @Role(['ANY'])
  @Mutation(() => CreatePointTransactionOutput)
  async createPointTransaction(
    @Args('input') createPointTransactionInput: CreatePointTransactionInput,
    @AuthUser() user: User,
  ) {
    return this.pointTransactionService.createPointTransaction(
      user,
      createPointTransactionInput,
    );
  }
}
