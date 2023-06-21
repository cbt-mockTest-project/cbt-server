"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TelegramModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramModule = void 0;
const telegram_resolver_1 = require("./telegram.resolver");
const common_constants_1 = require("../common/common.constants");
const common_1 = require("@nestjs/common");
const telegram_service_1 = require("./telegram.service");
let TelegramModule = TelegramModule_1 = class TelegramModule {
    static forRoot(options) {
        return {
            module: TelegramModule_1,
            exports: [telegram_service_1.TelegramService],
            providers: [
                {
                    provide: common_constants_1.CONFIG_OPTIONS,
                    useValue: options,
                },
                telegram_service_1.TelegramService,
                telegram_resolver_1.TelegramResolver,
            ],
        };
    }
};
TelegramModule = TelegramModule_1 = __decorate([
    (0, common_1.Module)({}),
    (0, common_1.Global)()
], TelegramModule);
exports.TelegramModule = TelegramModule;
//# sourceMappingURL=telegram.module.js.map