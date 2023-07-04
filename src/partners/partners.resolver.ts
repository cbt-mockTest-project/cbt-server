import { Query, Resolver } from '@nestjs/graphql';
import { Partner } from './entities/partners.entity';
import { PartnersService } from './partners.service';
import { GetPartnersOutput } from './dtos/getPartners.dto';

@Resolver(() => Partner)
export class PartnersResolver {
  constructor(private readonly partnersService: PartnersService) {}

  @Query(() => GetPartnersOutput)
  getPartners(): Promise<GetPartnersOutput> {
    return this.partnersService.getPartners();
  }
}
