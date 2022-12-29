import { RevalidateInput, RevalidateOutput } from './dto/revalidate.dto';
import { RevalidateService } from './revalidate.service';
import { Mutation, Resolver, Args } from '@nestjs/graphql';

@Resolver()
export class RevalidateResolver {
  constructor(private readonly revalidateService: RevalidateService) {}

  @Mutation(() => RevalidateOutput)
  async revalidate(
    @Args('input') revalidateInput: RevalidateInput,
  ): Promise<RevalidateOutput> {
    return this.revalidateService.revalidate(revalidateInput);
  }
}
