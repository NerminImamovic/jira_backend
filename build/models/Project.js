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
const validations_1 = __importDefault(require("@/utils/validations"));
const project_1 = require("@/constants/project");
const models_1 = require("@/models");
let Project = class Project extends typeorm_1.BaseEntity {
};
Project.validations = {
    name: [validations_1.default.required(), validations_1.default.maxLength(100)],
    url: validations_1.default.url(),
    category: [validations_1.default.required(), validations_1.default.oneOf(Object.values(project_1.ProjectCategory))]
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "url", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn({ type: "timestamp" }),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn({ type: "timestamp" }),
    __metadata("design:type", Date)
], Project.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => [models_1.Issue], { defaultValue: [] }),
    typeorm_1.OneToMany(() => models_1.Issue, issue => issue.project),
    __metadata("design:type", Array)
], Project.prototype, "issues", void 0);
__decorate([
    type_graphql_1.Field(() => [models_1.User], { defaultValue: [] }),
    typeorm_1.OneToMany(() => models_1.User, user => user.project),
    __metadata("design:type", Array)
], Project.prototype, "users", void 0);
Project = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Project);
exports.default = Project;
//# sourceMappingURL=Project.js.map