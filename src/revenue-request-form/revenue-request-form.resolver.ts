import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RevenueRequestForm } from './entites/revenue-request-form.entity';
import { RevenueRequestFormService } from './revenue-request-form.service';
import {
  CreateRevenueRequestFormInput,
  CreateRevenueRequestFormOutput,
} from './dtos/create-revenue-request-form.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorators';
import { GetRevenueRequestFormsOutput } from './dtos/get-revenue-request-forms.dto';
import {
  UpdateRevenueRequestFormInput,
  UpdateRevenueRequestFormOutput,
} from './dtos/update-revenue-request-form.dto';

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

  @Role(['ADMIN'])
  @Query(() => GetRevenueRequestFormsOutput)
  async getRevenueRequestForms(): Promise<GetRevenueRequestFormsOutput> {
    return this.revenueRequestFormService.getRevenueRequestForms();
  }

  @Role(['ADMIN'])
  @Mutation(() => UpdateRevenueRequestFormOutput)
  async updateRevenueRequestForm(
    @Args('input') updateRevenueRequestFormInput: UpdateRevenueRequestFormInput,
  ): Promise<UpdateRevenueRequestFormOutput> {
    return this.revenueRequestFormService.updateRevenueRequestForm(
      updateRevenueRequestFormInput,
    );
  }
}
