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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const node_cron_1 = require("node-cron");
const resetDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield typeorm_1.getConnection();
    yield connection.dropDatabase();
    yield connection.synchronize();
});
exports.resetDatabaseJob = () => {
    node_cron_1.schedule("0 0 * * *", () => {
        resetDatabase();
    });
};
exports.default = resetDatabase;
//# sourceMappingURL=resetDatabase.js.map