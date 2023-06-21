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
exports.TodoResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const Todo_entity_1 = require("./entities/Todo.entity");
const todo_service_1 = require("./todo.service");
const createOrUpdateTodo_1 = require("./dtos/createOrUpdateTodo");
const role_decorators_1 = require("../auth/role.decorators");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const getTodo_1 = require("./dtos/getTodo");
let TodoResolver = class TodoResolver {
    constructor(todoService) {
        this.todoService = todoService;
    }
    createOrUpdateTodo(user, createOrUpdateTodoInput) {
        return this.todoService.createOrUpdateTodo(createOrUpdateTodoInput, user);
    }
    getTodo(user, getTodoInput) {
        return this.todoService.getTodo(getTodoInput, user);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => createOrUpdateTodo_1.CreateOrUpdateTodoOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        createOrUpdateTodo_1.CreateOrUpdateTodoInput]),
    __metadata("design:returntype", void 0)
], TodoResolver.prototype, "createOrUpdateTodo", null);
__decorate([
    (0, graphql_1.Query)(() => getTodo_1.GetTodoOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, getTodo_1.GetTodoInput]),
    __metadata("design:returntype", void 0)
], TodoResolver.prototype, "getTodo", null);
TodoResolver = __decorate([
    (0, graphql_1.Resolver)(() => Todo_entity_1.Todo),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoResolver);
exports.TodoResolver = TodoResolver;
//# sourceMappingURL=todo.resolver.js.map