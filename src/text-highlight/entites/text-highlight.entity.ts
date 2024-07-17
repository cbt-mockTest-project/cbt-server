import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamQuestion } from 'src/exam/entities/mock-exam-question.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@InputType('TextHighlightDataInput')
@ObjectType()
export class TextHighlightData {
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

@InputType('TextHighlightInput')
@ObjectType()
@Entity()
export class TextHighlight extends OmitType(CoreEntity, ['id']) {
  @PrimaryColumn('uuid')
  @Field(() => String)
  @IsUUID()
  id: string;

  @Column({ type: 'json', nullable: true })
  @Field(() => TextHighlightData, { nullable: true, defaultValue: null })
  Data?: TextHighlightData;

  @ManyToOne(() => User, (user) => user.textHighlight, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => MockExamQuestion, (question) => question.textHighlight, {
    onDelete: 'CASCADE',
  })
  @Field(() => MockExamQuestion)
  question: MockExamQuestion;
}
