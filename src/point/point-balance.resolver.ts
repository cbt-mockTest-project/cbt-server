import { Query, Resolver } from '@nestjs/graphql';
import { PointBalance } from './entities/point-balance.entity';
import { PointBalanceService } from './point-balance.service';

@Resolver(() => PointBalance)
export class PointBalanceResolver {
  constructor(private readonly Service: PointBalanceService) {}
}
