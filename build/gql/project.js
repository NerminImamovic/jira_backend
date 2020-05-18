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
const models_1 = require("@/models");
const isAuth_1 = require("@/middlewares/isAuth");
const resolveTime_1 = require("@/middlewares/resolveTime");
const errorInterceptor_1 = require("@/middlewares/errorInterceptor");
const typeorm_1 = require("@/utils/typeorm");
const types_1 = require("@/gql/types");
let ProjectResolver = class ProjectResolver {
    getAllProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield models_1.Project.createQueryBuilder("project")
                .leftJoinAndSelect("project.issues", "issue")
                .leftJoin("project.users", "user")
                .getMany();
            return projects;
        });
    }
    getProjectWithUsersAndIssues(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield typeorm_1.findEntityOrThrow(models_1.Project, {
                id: ctx.req.currentUser.projectId,
                options: {
                    relations: ["issues", "users"]
                }
            });
            return project;
        });
    }
    updateProject(ctx, projectInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield typeorm_1.updateEntity(models_1.Project, ctx.req.currentUser.projectId, projectInput);
            return project;
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware([isAuth_1.IsAuth, errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Query(() => [models_1.Project]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "getAllProjects", null);
__decorate([
    type_graphql_1.UseMiddleware([resolveTime_1.ResolveTime, isAuth_1.IsAuth, errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Query(() => models_1.Project),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "getProjectWithUsersAndIssues", null);
__decorate([
    type_graphql_1.UseMiddleware([isAuth_1.IsAuth, errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Mutation(() => models_1.Project),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("project")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, types_1.ProjectInput]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "updateProject", null);
ProjectResolver = __decorate([
    type_graphql_1.Resolver()
], ProjectResolver);
exports.default = ProjectResolver;
//# sourceMappingURL=project.js.map