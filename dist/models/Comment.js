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
const validations_1 = __importDefault(require("@/utils/validations"));
const type_graphql_1 = require("type-graphql");
const models_1 = require("@/models");
let Comment = class Comment extends typeorm_1.BaseEntity {
};
Comment.validations = {
    body: [validations_1.default.required(), validations_1.default.maxLength(50000)]
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Comment.prototype, "body", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn({ type: "timestamp" }),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn({ type: "timestamp" }),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("uuid"),
    __metadata("design:type", String)
], Comment.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("integer"),
    __metadata("design:type", Number)
], Comment.prototype, "issueId", void 0);
__decorate([
    type_graphql_1.Field(() => models_1.User),
    typeorm_1.ManyToOne(() => models_1.User, user => user.comments),
    __metadata("design:type", models_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => models_1.Issue),
    typeorm_1.ManyToOne(() => models_1.Issue, issue => issue.comments, { onDelete: "CASCADE" }),
    __metadata("design:type", models_1.Issue)
], Comment.prototype, "issue", void 0);
Comment = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Comment);
exports.default = Comment;
//# sourceMappingURL=Comment.js.map