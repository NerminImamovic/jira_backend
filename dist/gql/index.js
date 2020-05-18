"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const comment_1 = __importDefault(require("./comment"));
const issue_1 = __importDefault(require("./issue"));
const project_1 = __importDefault(require("./project"));
exports.RESOLVERS = [
    auth_1.default,
    user_1.default,
    comment_1.default,
    issue_1.default,
    project_1.default,
];
//# sourceMappingURL=index.js.map