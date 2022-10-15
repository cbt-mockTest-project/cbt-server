import { RegisterInput, RegisterOutput } from './dtos/register.dto';
import { User } from './entities/user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => Boolean)
  async me() {
    return true;
  }

  @Mutation(() => RegisterOutput)
  async register(
    @Args('input') registerInput: RegisterInput,
  ): Promise<RegisterOutput> {
    return this.userService.register(registerInput);
  }
}
