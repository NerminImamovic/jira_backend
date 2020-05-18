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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const striptags_1 = __importDefault(require("striptags"));
const validations_1 = __importDefault(require("@/utils/validations"));
const issue_1 = require("@/constants/issue");
const models_1 = require("@/models");
let Issue = class Issue extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.setDescriptionText = () => {
            if (this.description) {
                this.descriptionText = striptags_1.default(this.description);
            }
        };
    }
};
Issue.validations = {
    title: [validations_1.default.required(), validations_1.default.maxLength(200)],
    type: [validations_1.default.required(), validations_1.default.oneOf(Object.values(issue_1.IssueType))],
    status: [validations_1.default.required(), validations_1.default.oneOf(Object.values(issue_1.IssueStatus))],
    priority: [validations_1.default.required(), validations_1.default.oneOf(Object.values(issue_1.IssuePriority))],
    listPosition: validations_1.default.required(),
    reporterId: validations_1.default.required()
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Issue.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], Issue.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], Issue.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], Issue.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], Issue.prototype, "priority", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float),
    typeorm_1.Column("double precision"),
    __metadata("design:type", Number)
], Issue.prototype, "listPosition", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", Object)
], Issue.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", Object)
], Issue.prototype, "descriptionText", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    typeorm_1.Column("integer", { nullable: true }),
    __metadata("design:type", Object)
], Issue.prototype, "estimate", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    typeorm_1.Column("integer", { nullable: true }),
    __metadata("design:type", Object)
], Issue.prototype, "timeSpent", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    typeorm_1.Column("integer", { nullable: true }),
    __metadata("design:type", Object)
], Issue.prototype, "timeRemaining", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn({ type: "timestamp" }),
    __metadata("design:type", Date)
], Issue.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn({ type: "timestamp" }),
    __metadata("design:type", Date)
], Issue.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("uuid"),
    __metadata("design:type", String)
], Issue.prototype, "reporterId", void 0);
__decorate([
    type_graphql_1.Field(() => models_1.Project),
    typeorm_1.ManyToOne(() => models_1.Project, project => project.issues),
    __metadata("design:type", models_1.Project)
], Issue.prototype, "project", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("integer"),
    __metadata("design:type", Number)
], Issue.prototype, "projectId", void 0);
__decorate([
    type_graphql_1.Field(() => [models_1.Comment], { defaultValue: [] }),
    typeorm_1.OneToMany(() => models_1.Comment, comment => comment.issue),
    __metadata("design:type", Array)
], Issue.prototype, "comments", void 0);
__decorate([
    type_graphql_1.Field(() => [models_1.User]),
    typeorm_1.ManyToMany(() => models_1.User, user => user.issues),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Issue.prototype, "users", void 0);
__decorate([
    type_graphql_1.Field(() => [type_graphql_1.ID]),
    typeorm_1.RelationId((issue) => issue.users),
    __metadata("design:type", Array)
], Issue.prototype, "userIds", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Object)
], Issue.prototype, "setDescriptionText", void 0);
Issue = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Issue);
exports.default = Issue;
//# sourceMappingURL=Issue.js.map