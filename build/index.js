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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias").addAlias("@", __dirname);
require("dotenv/config");
const createConnection_1 = __importDefault(require("./database/createConnection"));
const seedDatabase_1 = __importDefault(require("./database/seedDatabase"));
const type_graphql_1 = require("type-graphql");
const gql_1 = require("@/gql");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const establishDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createConnection_1.default();
        yield seedDatabase_1.default();
    }
    catch (error) {
        console.log(error);
    }
});
const initExpresGraphQL = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield type_graphql_1.buildSchema({
        resolvers: gql_1.RESOLVERS,
    }).catch((error) => console.log("Error " + error));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: schema,
        context: ({ req, res }) => ({ req, res }),
        playground: true,
        introspection: true,
    });
    const app = express_1.default();
    app.use(cors_1.default());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.get("/", (_, res) => {
        res.json({ server: "jira-clone-api" });
    });
    apolloServer.applyMiddleware({ app });
    app.listen(process.env.PORT || 5000, () => {
        console.log(`server started on http://localhost:5000${apolloServer.graphqlPath}`);
    });
});
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    yield establishDatabaseConnection();
    yield initExpresGraphQL();
});
bootstrap();
//# sourceMappingURL=index.js.map