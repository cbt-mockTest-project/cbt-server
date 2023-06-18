import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('TodoListInputType', { isAbstract: true })
@ObjectType()
export class TodoList {
  @Field(() => String)
  todo: string;
  @Field(() => Boolean)
  isDone: boolean;
}

@InputType('TodoInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Todo extends CoreEntity {
  @Column({ type: 'json', default: [] })
  @Field(() => [TodoList], { defaultValue: [] })
  todoList: TodoList[];

  @Column()
  @Field(() => String)
  dateString: string;

  @ManyToOne(() => User, (user) => user.todos)
  @Field(() => User)
  user: User;
}
