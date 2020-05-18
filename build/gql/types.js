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
const type_graphql_1 = require("type-graphql");
const issue_1 = require("@/constants/issue");
const project_1 = require("@/constants/project");
let CommentInput = class CommentInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CommentInput.prototype, "body", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", Number)
], CommentInput.prototype, "issueId", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], CommentInput.prototype, "userId", void 0);
CommentInput = __decorate([
    type_graphql_1.InputType()
], CommentInput);
exports.CommentInput = CommentInput;
let ProjectInput = class ProjectInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ProjectInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ProjectInput.prototype, "url", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ProjectInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProjectInput.prototype, "category", void 0);
ProjectInput = __decorate([
    type_graphql_1.InputType()
], ProjectInput);
exports.ProjectInput = ProjectInput;
let UserInput = class UserInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], UserInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "avatarUrl", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], UserInput.prototype, "projectId", void 0);
UserInput = __decorate([
    type_graphql_1.InputType()
], UserInput);
exports.UserInput = UserInput;
let IssueUpdateInput = class IssueUpdateInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], IssueUpdateInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], IssueUpdateInput.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], IssueUpdateInput.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], IssueUpdateInput.prototype, "priority", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], IssueUpdateInput.prototype, "listPostition", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], IssueUpdateInput.prototype, "reporterId", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", Number)
], IssueUpdateInput.prototype, "projectId", void 0);
__decorate([
    type_graphql_1.Field(() => [UserInput], { nullable: true }),
    __metadata("design:type", Array)
], IssueUpdateInput.prototype, "users", void 0);
__decorate([
    type_graphql_1.Field(() => [type_graphql_1.ID], { nullable: true }),
    __metadata("design:type", Array)
], IssueUpdateInput.prototype, "userIds", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], IssueUpdateInput.prototype, "description", void 0);
IssueUpdateInput = __decorate([
    type_graphql_1.InputType()
], IssueUpdateInput);
exports.IssueUpdateInput = IssueUpdateInput;
let IssueCreateInput = class IssueCreateInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], IssueCreateInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], IssueCreateInput.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], IssueCreateInput.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], IssueCreateInput.prototype, "priority", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], IssueCreateInput.prototype, "reporterId", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", Number)
], IssueCreateInput.prototype, "projectId", void 0);
__decorate([
    type_graphql_1.Field(() => [UserInput]),
    __metadata("design:type", Array)
], IssueCreateInput.prototype, "users", void 0);
__decorate([
    type_graphql_1.Field(() => [type_graphql_1.ID]),
    __metadata("design:type", Array)
], IssueCreateInput.prototype, "userIds", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], IssueCreateInput.prototype, "description", void 0);
IssueCreateInput = __decorate([
    type_graphql_1.InputType()
], IssueCreateInput);
exports.IssueCreateInput = IssueCreateInput;
let UserCreateInput = class UserCreateInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserCreateInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserCreateInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserCreateInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field({ defaultValue: "" }),
    __metadata("design:type", String)
], UserCreateInput.prototype, "avatarUrl", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], UserCreateInput.prototype, "projectId", void 0);
UserCreateInput = __decorate([
    type_graphql_1.InputType()
], UserCreateInput);
exports.UserCreateInput = UserCreateInput;
let LogInInput = class LogInInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], LogInInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], LogInInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LogInInput.prototype, "password", void 0);
LogInInput = __decorate([
    type_graphql_1.InputType()
], LogInInput);
exports.LogInInput = LogInInput;
let RegisterInput = class RegisterInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field({ defaultValue: "" }),
    __metadata("design:type", String)
], RegisterInput.prototype, "avatarUrl", void 0);
RegisterInput = __decorate([
    type_graphql_1.InputType()
], RegisterInput);
exports.RegisterInput = RegisterInput;
//# sourceMappingURL=types.js.map