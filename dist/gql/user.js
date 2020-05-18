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
const isAuth_1 = require("@/middlewares/isAuth");
const models_1 = require("@/models");
const errorInterceptor_1 = require("@/middlewares/errorInterceptor");
const types_1 = require("./types");
const typeorm_1 = require("@/utils/typeorm");
let UserResolver = class UserResolver {
    hello() {
        return "Hello World!";
    }
    currentUser(ctx) {
        return ctx.req.currentUser;
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield models_1.User.createQueryBuilder("user")
                .leftJoinAndSelect("user.comments", "comment")
                .leftJoinAndSelect("user.issues", "issue")
                .leftJoinAndSelect("user.project", "project", "project.id = user.projectId")
                .getMany();
            return users;
        });
    }
    createUser(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.createEntity(models_1.User, userInput);
        });
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UserResolver.prototype, "hello", null);
__decorate([
    type_graphql_1.UseMiddleware([isAuth_1.IsAuth, errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Query(() => models_1.User),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", models_1.User)
], UserResolver.prototype, "currentUser", null);
__decorate([
    type_graphql_1.UseMiddleware([isAuth_1.IsAuth, errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Query(() => [models_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllUsers", null);
__decorate([
    type_graphql_1.UseMiddleware([errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Mutation(() => models_1.User),
    __param(0, type_graphql_1.Arg("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UserCreateInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.default = UserResolver;
//# sourceMappingURL=user.js.map