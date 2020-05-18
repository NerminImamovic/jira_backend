"use strict";
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
const models_1 = require("@/models");
const project_1 = require("@/constants/project");
const issue_1 = require("@/constants/issue");
const typeorm_1 = require("@/utils/typeorm");
const seedUsers = () => {
    const users = [
        typeorm_1.createEntity(models_1.User, {
            email: "rick@jira.guest",
            name: "Rick Sanchez",
            password: "password",
            avatarUrl: "https://res.cloudinary.com/datlyfe/image/upload/v1583417163/rick_morty/rick_abe7oc.jpg"
        }),
        typeorm_1.createEntity(models_1.User, {
            email: "morty@jira.guest",
            name: "Morty Smith",
            password: "password",
            avatarUrl: "https://res.cloudinary.com/datlyfe/image/upload/v1583417163/rick_morty/morty_n3zqiz.jpg"
        })
    ];
    return Promise.all(users);
};
const seedProject = (users) => typeorm_1.createEntity(models_1.Project, {
    name: "Project name",
    url: "https://www.testurl.com",
    description: "Project description",
    category: project_1.ProjectCategory.SOFTWARE,
    users
});
const seedIssues = (project) => {
    const { users } = project;
    const issues = [
        typeorm_1.createEntity(models_1.Issue, {
            title: "Issue title 1",
            type: issue_1.IssueType.TASK,
            status: issue_1.IssueStatus.BACKLOG,
            priority: issue_1.IssuePriority.LOWEST,
            listPosition: 1,
            reporterId: users[0].id,
            project
        }),
        typeorm_1.createEntity(models_1.Issue, {
            title: "Issue title 2",
            type: issue_1.IssueType.TASK,
            status: issue_1.IssueStatus.BACKLOG,
            priority: issue_1.IssuePriority.MEDIUM,
            listPosition: 2,
            estimate: 5,
            description: "Issue description 2",
            reporterId: users[0].id,
            users: [users[0]],
            project
        }),
        typeorm_1.createEntity(models_1.Issue, {
            title: "Issue title 3",
            type: issue_1.IssueType.STORY,
            status: issue_1.IssueStatus.SELECTED,
            priority: issue_1.IssuePriority.HIGH,
            listPosition: 3,
            estimate: 10,
            description: "Issue description 3",
            reporterId: users[0].id,
            users: [users[0], users[1]],
            project
        })
    ];
    return Promise.all(issues);
};
const seedComments = (issue, user) => typeorm_1.createEntity(models_1.Comment, {
    body: "Comment body",
    issueId: issue.id,
    userId: user.id
});
const seedTestDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield seedUsers();
    const project = yield seedProject(users);
    const issues = yield seedIssues(project);
    yield seedComments(issues[0], project.users[0]);
    return [project, users[0], issues[0]];
});
exports.default = seedTestDatabase;
//# sourceMappingURL=seedTestDatabase.js.map