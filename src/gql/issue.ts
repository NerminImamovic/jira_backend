import { 
    Resolver,
    Arg,
    Query,
    Int,
    Mutation,
    UseMiddleware,
    Ctx,
} from "type-graphql";
import { Issue } from "@/models";
import { 
    findEntityOrThrow,
    createEntity,
    updateEntity,
    deleteEntity,
} from "@/utils/typeorm";
import { IsAuth } from "@/middlewares/isAuth";
import { ErrorInterceptor } from "@/middlewares/errorInterceptor";
import { IssueCreateInput, IssueUpdateInput } from "@/gql/types";
import { GQLContext } from "@/types/context";

@Resolver()
class IssueResolver { 

    private async calculateListPosition({
        projectId, 
        status
    }: Partial<Issue>): Promise<number> {
    
        const issues = await Issue.find({ projectId, status });    
        const listPostions = issues.map(({ listPosition }) => listPosition);
    
        if (listPostions.length > 0) {
            return Math.min(...listPostions) - 1;
        }
    
        return 1;
    }

    @UseMiddleware([IsAuth, ErrorInterceptor])
    @Query(() => [Issue])
    public async getAllIssues(): Promise<Issue[]> {

        const issues = await Issue.createQueryBuilder("issue")
            .leftJoinAndSelect("issue.comments", "comment")
            .leftJoinAndSelect("issue.project", "project", "project.id = issue.projectId")
            .getMany();

        return issues;
    }

    @UseMiddleware([IsAuth, ErrorInterceptor])
    @Query(() => [Issue])
    public async getProjectIssues(
        @Ctx() ctx: GQLContext,
        @Arg("searchTerm", () => String, { nullable: true}) searchTerm: string | null
    ): Promise<Issue[]> {

        const { projectId } = ctx.req.currentUser;

        let whereSQL = "issue.projectId = :projectId";

        if (searchTerm) {
            whereSQL += 
                " AND (issue.title ILIKE :searchTerm OR issue.descriptionText ILIKE :searchTerm)";
        }

        const issues = await Issue.createQueryBuilder("issue")
            .select()
            .where(whereSQL, { projectId, searchTerm: '%${searchTerm}%'})
            .getMany();

        return issues;
    }

    @UseMiddleware([IsAuth, ErrorInterceptor])
    @Query(() => Issue)
    public async getIssueWithUserAndComments(
        @Arg("issueId", () => Int) issueId: number
    ): Promise<Issue> {
        const issue: Issue = await findEntityOrThrow(Issue, { 
            id: issueId, 
            options: {
                relations: ["users", "comments", "comments.user"]
            },
        });

        return issue;
    }

    @UseMiddleware([IsAuth, ErrorInterceptor])
    @Mutation(() => Issue)
    public async createIssue(
        @Arg("issue") issueInput: IssueCreateInput
    ): Promise<Issue> {
        const listPosition = await this.calculateListPosition(issueInput);
        const issue = await createEntity(Issue, {
            ...issueInput,
            listPosition
        });
        return issue;
    }

    @UseMiddleware([IsAuth, ErrorInterceptor])
    @Mutation(() => Issue)
    public async updateIssue(
        @Arg("issue") issueInput: IssueUpdateInput,
        @Arg("id") issueId: number
    ): Promise<Issue> {
        const issue: Issue = await updateEntity(Issue, issueId, issueInput);
        return issue;
    }

    @UseMiddleware([IsAuth, ErrorInterceptor])
    @Mutation(() => Boolean)
    async deleteIssue(@Arg("id") issueId: number): Promise<boolean> {
        await deleteEntity(Issue, issueId);
        return true;
    }
}

export default IssueResolver;