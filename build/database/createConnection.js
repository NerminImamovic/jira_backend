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
const commonConfig = {
    type: "postgres",
    entities: Object.values(models),
    synchronize: true,
};
const connectionOptions = process.env.NODE_ENV === "production" ? Object.assign({ url: process.env.DATABASE_URL }, commonConfig) : Object.assign({ host: process.env.DB_HOST, port: Number(process.env.DB_PORT), username: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE }, commonConfig);
const createDatabaseConnection = () => typeorm_1.createConnection(connectionOptions);
exports.default = createDatabaseConnection;
//# sourceMappingURL=createConnection.js.map