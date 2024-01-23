import { Query, Resolver } from '@nestjs/graphql';
import { Seller } from './entities/seller.entity';
import { GetBuyersOutput } from './dtos/getBuyers.dto';
import { SellerService } from './seller.service';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorators';
import { CoreOutput } from 'src/common/dtos/output.dto';

@Resolver(() => Seller)
export class SellerResolver {
  constructor(private readonly sellerService: SellerService) {}

  @Role(['ANY'])
  @Query(() => GetBuyersOutput)
  getBuyers(@AuthUser() user: User) {
    return this.sellerService.getBuyers(user);
  }

  @Query(() => CoreOutput)
  syncPrice() {
    return this.sellerService.syncPrice();
  }
}
