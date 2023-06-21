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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.TodoList = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let TodoList = class TodoList {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TodoList.prototype, "todo", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], TodoList.prototype, "isDone", void 0);
TodoList = __decorate([
    (0, graphql_1.InputType)('TodoListInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)()
], TodoList);
exports.TodoList = TodoList;
let Todo = class Todo extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'json', default: [] }),
    (0, graphql_1.Field)(() => [TodoList], { defaultValue: [] }),
    __metadata("design:type", Array)
], Todo.prototype, "todoList", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Todo.prototype, "dateString", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.todos),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Todo.prototype, "user", void 0);
Todo = __decorate([
    (0, graphql_1.InputType)('TodoInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Todo);
exports.Todo = Todo;
//# sourceMappingURL=Todo.entity.js.map