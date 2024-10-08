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
import { GetPointTransactionsOutput } from './dtos/point-transaction/get-point-transactions.dto';
import {
  CreatePointTransactionForAdminInput,
  CreatePointTransactionForAdminOutput,
} from './dtos/point-transaction/create-point-transaction-for-admin.dto';
import {
  GetPointTransactionsForAdminInput,
  GetPointTransactionsForAdminOutput,
} from './dtos/point-transaction/get-point-transactions-for-admin.dto';

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

  @Role(['ANY'])
  @Query(() => GetPointTransactionsOutput)
  async getPointTransactions(@AuthUser() user: User) {
    return this.pointTransactionService.getPointTransactions(user);
  }

  @Role(['ADMIN'])
  @Mutation(() => CreatePointTransactionForAdminOutput)
  async createPointTransactionForAdmin(
    @Args('input')
    createPointTransactionForAdminInput: CreatePointTransactionForAdminInput,
  ) {
    return this.pointTransactionService.createPointTransactionForAdmin(
      createPointTransactionForAdminInput,
    );
  }

  @Role(['ADMIN'])
  @Query(() => GetPointTransactionsForAdminOutput)
  async getPointTransactionsForAdmin(
    @Args('input')
    getPointTransactionsForAdminInput: GetPointTransactionsForAdminInput,
  ) {
    return this.pointTransactionService.getPointTransactionsForAdmin(
      getPointTransactionsForAdminInput,
    );
  }
}
