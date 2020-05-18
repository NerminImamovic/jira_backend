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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const errorInterceptor_1 = require("@/middlewares/errorInterceptor");
const types_1 = require("./types");
const authToken_1 = require("@/utils/authToken");
const typeorm_1 = require("@/utils/typeorm");
const models_1 = require("@/models");
const errors_1 = require("@/errors");
let AuthResolver = class AuthResolver {
    register(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield typeorm_1.createEntity(models_1.User, input);
            return authToken_1.signToken({ sub: user.id });
        });
    }
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield typeorm_1.findEntityOrThrow(models_1.User, { options: { where: { email: input.email } } });
            if (!user.checkIfUnencryptedPasswordIsValid(input.password)) {
                throw new errors_1.CustomError("Wrong Password ", "WRONG_PASSWORD", 401);
            }
            return authToken_1.signToken({ sub: user.id });
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware([errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    type_graphql_1.UseMiddleware([errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.LogInInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
AuthResolver = __decorate([
    type_graphql_1.Resolver()
], AuthResolver);
exports.default = AuthResolver;
//# sourceMappingURL=auth.js.map