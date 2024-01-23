import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/entities/role.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { SellerResolver } from './seller.resolver';
import { SellerService } from './seller.service';
import { UserAndRole } from 'src/users/entities/userAndRole.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Seller,
      User,
      Role,
      MockExamCategory,
      UserAndRole,
    ]),
  ],
  providers: [SellerResolver, SellerService],
})
export class SellerModule {}
