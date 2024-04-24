import { Query, Resolver } from '@nestjs/graphql';
import { Seceders } from './entities/seceders.entity';
import { SecedersService } from './seceders.service';

@Resolver(() => Seceders)
export class SecedersResolver {
  constructor(private readonly secedersService: SecedersService) {}
}
