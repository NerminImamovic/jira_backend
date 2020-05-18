import { default as AuthResolver } from "./auth";
import { default as UserResolver } from "./user";
import { default as CommentResolver } from "./comment";
import { default as IssueResolver } from "./issue";
import { default as ProjectResolver } from "./project";

export const RESOLVERS = [
    AuthResolver,
    UserResolver,
    CommentResolver,
    IssueResolver,
    ProjectResolver,
];