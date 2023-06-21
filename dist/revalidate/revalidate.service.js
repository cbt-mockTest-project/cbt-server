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
exports.RevalidateService = void 0;
const common_constants_1 = require("../common/common.constants");
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let RevalidateService = class RevalidateService {
    constructor(options) {
        this.options = options;
    }
    async revalidate(revalidateInput) {
        const { path } = revalidateInput;
        try {
            await axios_1.default.post(`${this.options.clientUrl}/api/revalidate?secret=${this.options.revalidateKey}`, { path });
            return {
                ok: true,
            };
        }
        catch (e) {
            console.log(`${path} revalidate failure`);
            return {
                ok: false,
                error: 'revalidate failed',
            };
        }
    }
};
RevalidateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_constants_1.CONFIG_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], RevalidateService);
exports.RevalidateService = RevalidateService;
//# sourceMappingURL=revalidate.service.js.map