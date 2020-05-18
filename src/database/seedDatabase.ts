import { Comment, Issue, Project, User } from "@/models"
import { ProjectCategory } from "@/constants/project";
import { IssueType, IssueStatus, IssuePriority } from "@/constants/issue";
import { createEntity } from "@/utils/typeorm";

const seedUsers = (): Promise<User[]> => {

    const users = [
        createEntity(User, {
            email: "berling@jira.guest",
            name: "Berlin",
            password: "password",
            avatarUrl:
                "https://res.cloudinary.com/datlyfe/image/upload/v1583949061/casa%20del%20papel/berlin_tjeb95.jpg"
        }),
    ];

    return Promise.all(users);
};

const seedProject = (users: User[]): Promise<Project> => 
    createEntity(Project, {
        name: "Money Heist",
        url: "https://www.atlassian.com/software/jira",
        description: "The robbery of the Royal Mint of Spain",
        category: ProjectCategory.MARKETING,
        users
    });

const seedIssues = (project: Project): Promise<Issue[]> => {

    const { users } = project; 

    console.log("Users " + JSON.stringify(users));

    console.log(IssueStatus.DONE);

    const issues = [
        createEntity(Issue, {
          title: "The rules and guidlines of the heist",
          type: IssueType.STORY,
          status: IssueStatus.DONE,
          priority: IssuePriority.HIGH,
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
}

const seedComments = (issues: Issue[], users: User[]): Promise<Comment[]> => {
    const comments = [
        createEntity(Comment, {
            body: "HAHA HAHA HAHA HAHA...",
            issueId: issues[0].id,
            userId: users[0].id
          })
    ];
    return Promise.all(comments);
}

const seedDatabase = async () : Promise<void> => {
    const users: User[] = await seedUsers();
    const project: Project = await seedProject(users);
    const issues: Issue[] = await seedIssues(project);
    await seedComments(issues, users);
}

export default seedDatabase;