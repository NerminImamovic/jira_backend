import {
    Resolver,
    UseMiddleware,
    Arg,
    Mutation
} from "type-graphql";
import { ErrorInterceptor } from "@/middlewares/errorInterceptor";
// import seedDatabase from "@/database/seedDatabase";
import { RegisterInput, LogInInput } from "./types";
import { signToken } from "@/utils/authToken";
import { createEntity, findEntityOrThrow } from "@/utils/typeorm";
import { User } from "@/models";
import { CustomError } from "@/errors";

@Resolver()
class AuthResolver {

    // @UseMiddleware([ErrorInterceptor])
    // @Query(() => String)
    // async seedDatabase(): Promise<string> {
    //     const user = await seedDatabase();
    //     return signToken({ sub: user.id });
    // }

    @UseMiddleware([ErrorInterceptor])
    @Mutation(() => String)
    async register(@Arg("user") input: RegisterInput): Promise<string> {
        const user: User = await createEntity(User, input);
        return signToken({ sub: user.id });
    }

    @UseMiddleware([ErrorInterceptor])
    @Mutation(() => String)
    async login(@Arg("user") input: LogInInput): Promise<string> {

        const user: User = await findEntityOrThrow(User, {options: { where: { email: input.email } } })

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(input.password)) {
            throw new CustomError("Wrong Password ", "WRONG_PASSWORD", 401); 
        }

        return signToken({ sub: user.id });
    }

}

export default AuthResolver;