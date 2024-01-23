import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { Role } from 'src/users/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, OneToMany, OneToOne } from 'typeorm';

@InputType('SellerInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Seller extends CoreEntity {
  @OneToMany(() => Role, (role) => role.seller)
  @Field(() => [Role])
  roles: Role[];

  @OneToMany(() => MockExamCategory, (category) => category.seller)
  @Field(() => [MockExamCategory])
  examCategories: MockExamCategory[];

  @OneToOne(() => User, (user) => user.seller, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
