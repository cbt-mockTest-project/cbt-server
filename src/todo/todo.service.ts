import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/Todo.entity';
import { Repository } from 'typeorm';
import {
  CreateOrUpdateTodoInput,
  CreateOrUpdateTodoOutput,
} from './dtos/createOrUpdateTodo';
import { User } from 'src/users/entities/user.entity';
import { GetTodoInput, GetTodoOutput } from './dtos/getTodo';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todo: Repository<Todo>,
  ) {}

  async getTodo(
    getTodoInput: GetTodoInput,
    user: User,
  ): Promise<GetTodoOutput> {
    try {
      const { dateString } = getTodoInput;
      const todo = await this.todo.findOne({
        where: {
          user: {
            id: user.id,
          },
          dateString,
        },
      });
      if (todo) {
        return { ok: true, todo };
      } else {
        return { ok: true };
      }
    } catch (error) {
      return { ok: false, error: '일정을 불러올 수 없습니다.' };
    }
  }

  async createOrUpdateTodo(
    createOrUpdateTodoInput: CreateOrUpdateTodoInput,
    user: User,
  ): Promise<CreateOrUpdateTodoOutput> {
    try {
      const { todoList, dateString } = createOrUpdateTodoInput;
      const todo = await this.todo.findOne({
        where: {
          user: {
            id: user.id,
          },
          dateString,
        },
      });
      if (todo) {
        if (todoList.length === 0) {
          await this.todo.delete(todo.id);
          return { ok: true };
        }
        await this.todo.update(todo.id, { todoList });
        return { ok: true };
      } else {
        await this.todo.save(this.todo.create({ todoList, dateString, user }));
        return { ok: true };
      }
    } catch (error) {
      return { ok: false, error: '일정을 추가할 수 없습니다.' };
    }
  }
}
