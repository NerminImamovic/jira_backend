import {
    Resolver,
    Query,
    UseMiddleware,
    Ctx,
    Mutation,
    Arg, 
} from "type-graphql";
import { IsAuth } from "@/middlewares/isAuth";
import { GQLContext } from "@/types/context";
import { User } from "@/models";
import { ErrorInterceptor } from "@/middlewares/errorInterceptor";
import { UserCreateInput } from "./types";
import { createEntity } from "@/utils/typeorm";

@Resolver()
class UserResolver {

    @Query(() => String)
    hello(): string {
        return "Hello World!";
    }

    @UseMiddleware([IsAuth, ErrorInterceptor])
    @Query(() => User)
    currentUser(@Ctx() ctx: GQLContext): User {
        return ctx.req.currentUser;
    }

    @UseMiddleware([IsAuth, ErrorInterceptor])
    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {

        const users = await User.createQueryBuilder("user")
            .leftJoinAndSelect("user.comments", "comment")
            .leftJoinAndSelect("user.issues", "issue")
            .leftJoinAndSelect("user.project", "project", "project.id = user.projectId")
            .getMany();

        return users;
    }

    @UseMiddleware([ErrorInterceptor])
    @Mutation(() => User)
    async createUser(@Arg("user") userInput: UserCreateInput): Promise<User> {
        return await createEntity(User, userInput);
    }
}

export default UserResolver;