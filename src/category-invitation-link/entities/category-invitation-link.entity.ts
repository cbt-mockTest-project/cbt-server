import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('CategoryInvitationLinkInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class CategoryInvitationLink extends CoreEntity {
  @ManyToOne(
    () => MockExamCategory,
    (category) => category.categoryInvitationLinks,
    {
      onDelete: 'CASCADE',
    },
  )
  @Field(() => MockExamCategory)
  category: MockExamCategory;

  @ManyToOne(() => User, (user) => user.categoryInvitationLinks, {
    onDelete: 'CASCADE',
  })
  @Field(() => User, { nullable: true })
  user?: User;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  isUsed: boolean;

  @Column({ default: '' })
  @Field(() => String, { defaultValue: '' })
  code: string;
}
