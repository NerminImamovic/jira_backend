"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const models = __importStar(require("@/models"));
const connectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_DATABASE,
    entities: Object.values(models),
    synchronize: true,
    dropSchema: true
};
const createTestDatabaseConnection = () => typeorm_1.createConnection(connectionOptions);
exports.default = createTestDatabaseConnection;
//# sourceMappingURL=createTestConnection.js.map