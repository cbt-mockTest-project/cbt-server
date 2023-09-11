import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DiscountCode } from './discount-code.entity';
import { DiscountCodeService } from './discount-code.service';
import {
  UpdateDiscountCodeInput,
  UpdateDiscountCodeOutput,
} from './dtos/updateDiscountCode.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorators';
import {
  CheckDiscountCodeInput,
  CheckDiscountCodeOutput,
} from './dtos/checkDiscountCode.dto';

@Resolver(() => DiscountCode)
export class DiscountCodeResolver {
  constructor(private readonly discountCodeService: DiscountCodeService) {}

  @Mutation(() => Boolean)
  async createDiscountCode(): Promise<boolean> {
    return this.discountCodeService.createDiscountCode();
  }

  @Role(['ANY'])
  @Mutation(() => UpdateDiscountCodeOutput)
  async updateDiscountCode(
    @AuthUser() user: User,
    @Args('input') updateDiscountCodeInput: UpdateDiscountCodeInput,
  ): Promise<UpdateDiscountCodeOutput> {
    return this.discountCodeService.updateDiscountCode(
      user,
      updateDiscountCodeInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => CheckDiscountCodeOutput)
  async checkDiscountCode(
    @Args('input') checkDiscountCodeInput: CheckDiscountCodeInput,
  ): Promise<CheckDiscountCodeOutput> {
    return this.discountCodeService.checkDiscountCode(checkDiscountCodeInput);
  }

  @Query(() => [String])
  async test(): Promise<string[]> {
    return this.discountCodeService.test();
  }
}
