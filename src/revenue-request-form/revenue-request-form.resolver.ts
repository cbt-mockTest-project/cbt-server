import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RevenueRequestForm } from './entites/revenue-request-form.entity';
import { RevenueRequestFormService } from './revenue-request-form.service';
import {
  CreateRevenueRequestFormInput,
  CreateRevenueRequestFormOutput,
} from './dtos/create-revenue-request-form.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorators';

@Resolver(() => RevenueRequestForm)
export class RevenueRequestFormResolver {
  constructor(
    private readonly revenueRequestFormService: RevenueRequestFormService,
  ) {}

  @Role(['ANY'])
  @Mutation(() => CreateRevenueRequestFormOutput)
  async createRevenueRequestForm(
    @AuthUser() user: User,
    @Args('input') createRevenueRequestFormInput: CreateRevenueRequestFormInput,
  ): Promise<CreateRevenueRequestFormOutput> {
    return this.revenueRequestFormService.createRevenueRequestForm(
      user,
      createRevenueRequestFormInput,
    );
  }
}
