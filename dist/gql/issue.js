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
const typeorm_1 = require("@/utils/typeorm");
const isAuth_1 = require("@/middlewares/isAuth");
const errorInterceptor_1 = require("@/middlewares/errorInterceptor");
const types_1 = require("@/gql/types");
let IssueResolver = class IssueResolver {
    calculateListPosition({ projectId, status }) {
        return __awaiter(this, void 0, void 0, function* () {
            const issues = yield models_1.Issue.find({ projectId, status });
            const listPostions = issues.map(({ listPosition }) => listPosition);
            if (listPostions.length > 0) {
                return Math.min(...listPostions) - 1;
            }
            return 1;
        });
    }
    getAllIssues() {
        return __awaiter(this, void 0, void 0, function* () {
            const issues = yield models_1.Issue.createQueryBuilder("issue")
                .leftJoinAndSelect("issue.comments", "comment")
                .leftJoinAndSelect("issue.project", "project", "project.id = issue.projectId")
                .getMany();
            return issues;
        });
    }
    getProjectIssues(ctx, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectId } = ctx.req.currentUser;
            let whereSQL = "issue.projectId = :projectId";
            if (searchTerm) {
                whereSQL +=
                    " AND (issue.title ILIKE :searchTerm OR issue.descriptionText ILIKE :searchTerm)";
            }
            const issues = yield models_1.Issue.createQueryBuilder("issue")
                .select()
                .where(whereSQL, { projectId, searchTerm: '%${searchTerm}%' })
                .getMany();
            return issues;
        });
    }
    getIssueWithUserAndComments(issueId) {
        return __awaiter(this, void 0, void 0, function* () {
            const issue = yield typeorm_1.findEntityOrThrow(models_1.Issue, {
                id: issueId,
                options: {
                    relations: ["users", "comments", "comments.user"]
                },
            });
            return issue;
        });
    }
    createIssue(issueInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const listPosition = yield this.calculateListPosition(issueInput);
            const issue = yield typeorm_1.createEntity(models_1.Issue, Object.assign(Object.assign({}, issueInput), { listPosition }));
            return issue;
        });
    }
    updateIssue(issueInput, issueId) {
        return __awaiter(this, void 0, void 0, function* () {
            const issue = yield typeorm_1.updateEntity(models_1.Issue, issueId, issueInput);
            return issue;
        });
    }
    deleteIssue(issueId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.deleteEntity(models_1.Issue, issueId);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware([isAuth_1.IsAuth, errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Query(() => [models_1.Issue]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "getAllIssues", null);
__decorate([
    type_graphql_1.UseMiddleware([isAuth_1.IsAuth, errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Query(() => [models_1.Issue]),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("searchTerm", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "getProjectIssues", null);
__decorate([
    type_graphql_1.UseMiddleware([isAuth_1.IsAuth, errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Query(() => models_1.Issue),
    __param(0, type_graphql_1.Arg("issueId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "getIssueWithUserAndComments", null);
__decorate([
    type_graphql_1.UseMiddleware([isAuth_1.IsAuth, errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Mutation(() => models_1.Issue),
    __param(0, type_graphql_1.Arg("issue")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.IssueCreateInput]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "createIssue", null);
__decorate([
    type_graphql_1.UseMiddleware([isAuth_1.IsAuth, errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Mutation(() => models_1.Issue),
    __param(0, type_graphql_1.Arg("issue")),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.IssueUpdateInput, Number]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "updateIssue", null);
__decorate([
    type_graphql_1.UseMiddleware([isAuth_1.IsAuth, errorInterceptor_1.ErrorInterceptor]),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "deleteIssue", null);
IssueResolver = __decorate([
    type_graphql_1.Resolver()
], IssueResolver);
exports.default = IssueResolver;
//# sourceMappingURL=issue.js.map