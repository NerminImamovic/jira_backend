require("module-alias").addAlias("@", __dirname);
import "dotenv/config";
import createDatabaseConnection from "./database/createConnection"
import seedDatabase from "./database/seedDatabase";
// import resetDatabase from "./database/resetDatabase";
import { buildSchema } from "type-graphql";
import { RESOLVERS } from "@/gql";
import { GraphQLSchema } from "graphql";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import cors from "cors";

const establishDatabaseConnection = async (): Promise<void> => {
    try {
        await createDatabaseConnection();
        await seedDatabase();
        // await resetDatabase();
    } catch (error) {
        console.log(error);
    }
};

const initExpresGraphQL = async () => {
    
    const schema: void | GraphQLSchema = await buildSchema({
        resolvers: RESOLVERS,
    }).catch((error) => console.log("Error " + error));

    const apolloServer = new ApolloServer({
        schema: schema as GraphQLSchema,
        context: ({ req, res }: any) => ({ req, res }),
        playground: true,
        introspection: true,
      });

    const app = Express();

    app.use(cors());
    app.use(Express.urlencoded({ extended: true }));
  
    app.get("/", (_, res) => {
      res.json({ server: "jira-clone-api" });
    });
  
    apolloServer.applyMiddleware({ app });
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `server started on http://localhost:5000${apolloServer.graphqlPath}`
      );
    });

}


const bootstrap = async (): Promise<void> => {
    await establishDatabaseConnection();
    await initExpresGraphQL();
}

bootstrap();