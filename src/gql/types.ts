import { InputType, Field, ID, Float } from "type-graphql";
import { Comment, Issue, Project, User } from "@/models";
import { IssueType, IssueStatus, IssuePriority } from "@/constants/issue";
import { ProjectCategory } from "@/constants/project";


// extends - The new class is a child. It gets beneftis coming with inheritance.
// It has all properties, methods as its parnet. It can override some of these and implmenet new, but the parent stuff is already included.

// implements - The new class can be treated as the same "shape", while it is not a child.

@InputType()
export class CommentInput implements Partial<Comment> {

    @Field({ nullable: true})
    body: string;
    
    @Field(() => ID, { nullable: true })
    issueId: number;   
    
    @Field(() => ID, { nullable: true })
    userId: string;
}

@InputType()
export class ProjectInput implements Partial<Project> {
    
    @Field({ nullable: true })
    name: string;

    @Field(() => String, { nullable: true })
    url: string | null;

    @Field(() => String, { nullable: true })
    description: string | null;
    
    @Field(() => String, { nullable: true })
    category: ProjectCategory;
}

@InputType()
export class UserInput implements Partial<User> {

    @Field(() => ID)
    id: string;

    @Field({ nullable: true })
    name: string; 

    @Field({ nullable: true })
    avatarUrl: string;

    @Field({ nullable: true })
    projectId: number;
}

@InputType()
export class IssueUpdateInput implements Partial<Issue> {

    @Field({ nullable: true })
    title: string;

    @Field(() => String, { nullable: true })
    type: IssueType;

    @Field(() => String, { nullable: true })
    status: IssueStatus;

    @Field(() => String, { nullable: true })
    priority: IssuePriority;

    @Field(() => Float, { nullable: true })
    listPostition: number;

    @Field(() => ID, { nullable: true })
    reporterId: string;

    @Field(() => ID, { nullable: true })
    projectId: number;

    @Field(() => [UserInput], { nullable: true })
    users: User[];

    @Field(() => [ID], { nullable: true })
    userIds: string[];

    @Field(() => String, { nullable: true })
    description: string | null;
}

@InputType() 
export class IssueCreateInput implements Partial<Issue> {

    @Field()
    title: string;

    @Field(() => String)
    type: IssueType;

    @Field(() => String)
    status: IssueStatus;

    @Field(() => String)
    priority: IssuePriority;

    @Field(() => ID)
    reporterId: string;

    @Field(() => ID)
    projectId: number;

    @Field(() => [UserInput])
    users: User[];

    @Field(() => [ID])
    userIds: string[];

    @Field(() => String, { nullable: true })
    description: string | null;
}

@InputType()
export class UserCreateInput implements Partial<User> {

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field({ defaultValue: "" })
    avatarUrl: string;

    @Field()
    projectId: number
}

@InputType()
export class LogInInput implements Partial<User> {

    @Field({ nullable: true })
    name: string;
    
    @Field({ nullable: true })
    email: string;

    @Field()
    password: string;
}

@InputType()
export class RegisterInput implements Partial<User> {

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field({ defaultValue: "" })
    avatarUrl: string;
}