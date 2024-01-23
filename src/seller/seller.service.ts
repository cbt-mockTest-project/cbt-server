import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { In, Repository } from 'typeorm';
import { GetBuyersOutput } from './dtos/getBuyers.dto';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/entities/role.entity';
import { UserAndRole } from 'src/users/entities/userAndRole.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller) private readonly sellers: Repository<Seller>,
    @InjectRepository(Role) private readonly roles: Repository<Role>,
    @InjectRepository(UserAndRole)
    private readonly userAndRoles: Repository<UserAndRole>,
  ) {}

  async getBuyers(user: User): Promise<GetBuyersOutput> {
    try {
      const seller = await this.sellers.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: {
          roles: true,
        },
      });
      const sellerRoleIds = seller.roles.map((role) => role.id);
      const userAndRoles = await this.userAndRoles.find({
        where: {
          role: {
            id: In(sellerRoleIds),
          },
        },
        relations: {
          user: true,
          role: true,
        },
        order: {
          created_at: 'DESC',
        },
      });

      return {
        ok: true,
        userAndRoles,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not get buyers',
      };
    }
  }
}
