import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CoupangService } from './coupang.service';

@Resolver(() => CoreOutput)
export class CoupangResolver {
  constructor(private readonly coupangService: CoupangService) {}

  @Mutation(() => String)
  async converLinkToPartnerLink(@Args('url') url: string): Promise<string> {
    return this.coupangService.converLinkToPartnerLink(url);
  }
}
