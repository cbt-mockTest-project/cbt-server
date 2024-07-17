import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamQuestion } from 'src/exam/entities/mock-exam-question.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, ManyToOne, PrimaryColumn } from 'typeorm';

@InputType('TextHighlightOption')
@ObjectType()
export class TextHighlightOption {
  @Field(() => [Number])
  startContainer: number[];

  @Field(() => Number)
  startOffset: number;

  @Field(() => [Number])
  endContainer: number[];

  @Field(() => Number)
  endOffset: number;

  @Field(() => String)
  text: string;

  @Field(() => String)
  memo: string;
}

export class TextHighlight extends OmitType(CoreEntity, ['id']) {
  @PrimaryColumn('uuid')
  @Field(() => String)
  @IsUUID()
  id: string;

  @Column({ type: 'json', nullable: true })
  @Field(() => TextHighlightOption, { nullable: true, defaultValue: null })
  option?: TextHighlightOption;

  @ManyToOne(() => User, (user) => user.textHighlight, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => MockExamQuestion, (question) => question.textHighlight, {
    onDelete: 'CASCADE',
  })
  @Field(() => MockExamQuestion)
  question: MockExamQuestion;
}
