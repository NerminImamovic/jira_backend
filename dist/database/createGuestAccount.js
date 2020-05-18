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
            email: "berling@jira.guest",
            name: "Berlin",
            avatarUrl: "https://res.cloudinary.com/datlyfe/image/upload/v1583949061/casa%20del%20papel/berlin_tjeb95.jpg"
        }),
    ];
    return Promise.all(users);
};
const seedProject = (users) => typeorm_1.createEntity(models_1.Project, {
    name: "Money Heist",
    url: "https://www.atlassian.com/software/jira",
    description: "The robbery of the Royal Mint of Spain",
    category: project_1.ProjectCategory.MARKETING,
    users
});
const seedIssues = (project) => {
    const { users } = project;
    console.log("Users " + JSON.stringify(users));
    console.log(issue_1.IssueStatus.DONE);
    const issues = [
        typeorm_1.createEntity(models_1.Issue, {
            title: "The rules and guidlines of the heist",
            type: issue_1.IssueType.STORY,
            status: issue_1.IssueStatus.DONE,
            priority: issue_1.IssuePriority.HIGH,
            listPosition: 1,
            description: `<h3>These rules <strong>MUST</strong> be followed :</h3><p><br></p><ul><li><strong>No Killing:</strong> We want to appear to be Just Like Robin Hood, we do not intend to hurt anyone</li><li><strong>No Names:</strong> Everyone is nicknamed after a city. do not share you real names with anyone even me</li><li><strong>No Personal Relationships:</strong> this is good for preventing attachments that might compromise the operation</li></ul><p><br></p><h3><u style="background-color: initial;">That's it!</u></h3><h2>💯💯</h2><p><br></p>`,
            estimate: 12,
            timeSpent: 11,
            reporterId: users[0].id,
            project,
            users: [users[0]]
        }),
    ];
    return Promise.all(issues);
};
const seedComments = (issues, users) => {
    const comments = [
        typeorm_1.createEntity(models_1.Comment, {
            body: "HAHA HAHA HAHA HAHA...",
            issueId: issues[0].id,
            userId: users[0].id
        })
    ];
    return Promise.all(comments);
};
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield seedUsers();
    const project = yield seedProject(users);
    const issues = yield seedIssues(project);
    yield seedComments(issues, users);
    return users[0];
});
exports.default = seedDatabase;
//# sourceMappingURL=seedDatabase.js.map