import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    ManyToOne,
    RelationId,
    Entity
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import is from "@/utils/validations";
import { Issue, Project, Comment } from "@/models";
import * as bcrypt from "bcryptjs";

@ObjectType()
@Entity()
class User extends BaseEntity {
    static validations = {
        name: [is.required(), is.maxLength(100)],
        email: [is.required(), is.email(), is.maxLength(200)]
    };

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column("varchar")
    name: string;

    @Field()
    @Column("varchar")
    email: string;
    
    @Field()
    @Column("varchar")
    password: string;

    @Field()
    @Column("varchar", { length: 2000 })
    avatarUrl: string;

    @Field()
    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @Field(() => [Comment])
    @OneToMany(
        () => Comment,
        comment => comment.user
    )
    comments: Comment[];

    @Field(() => [Issue])
    @ManyToMany(
        () => Issue,
        issue => issue.users
    )
    issues: Issue[];

    @Field(() => Project)
    @ManyToOne(
        () => Project,
        project => project.users
    )
    project: Project;

    @Field()
    @RelationId((user: User) => user.project)
    projectId: number;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}

export default User;