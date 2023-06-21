"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Todo_entity_1 = require("./entities/Todo.entity");
const typeorm_2 = require("typeorm");
let TodoService = class TodoService {
    constructor(todo) {
        this.todo = todo;
    }
    async getTodo(getTodoInput, user) {
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
            }
            else {
                return { ok: true };
            }
        }
        catch (error) {
            return { ok: false, error: '일정을 불러올 수 없습니다.' };
        }
    }
    async createOrUpdateTodo(createOrUpdateTodoInput, user) {
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
                const newTodo = await this.todo.save(Object.assign(Object.assign({}, todo), { todoList }));
                return { ok: true, todo: newTodo };
            }
            else {
                const newTodo = await this.todo.save(this.todo.create({ todoList, dateString, user }));
                return { ok: true, todo: newTodo };
            }
        }
        catch (error) {
            return { ok: false, error: '일정을 추가할 수 없습니다.' };
        }
    }
};
TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Todo_entity_1.Todo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map