"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IssueType;
(function (IssueType) {
    IssueType["TASK"] = "task";
    IssueType["BUG"] = "bug";
    IssueType["STORY"] = "story";
})(IssueType = exports.IssueType || (exports.IssueType = {}));
var IssueStatus;
(function (IssueStatus) {
    IssueStatus["BACKLOG"] = "backlog";
    IssueStatus["SELECTED"] = "selected";
    IssueStatus["INPROGRESS"] = "inprogress";
    IssueStatus["DONE"] = "done";
})(IssueStatus = exports.IssueStatus || (exports.IssueStatus = {}));
var IssuePriority;
(function (IssuePriority) {
    IssuePriority["HIGHEST"] = "5";
    IssuePriority["HIGH"] = "4";
    IssuePriority["MEDIUM"] = "3";
    IssuePriority["LOW"] = "2";
    IssuePriority["LOWEST"] = "1";
})(IssuePriority = exports.IssuePriority || (exports.IssuePriority = {}));
//# sourceMappingURL=issue.js.map