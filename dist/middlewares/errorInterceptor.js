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
const errors_1 = require("@/errors");
const javascript_1 = require("@/utils/javascript");
exports.ErrorInterceptor = (_, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield next();
    }
    catch (error) {
        console.log(error);
        const isErrorSafeForClient = error instanceof errors_1.CustomError;
        if (isErrorSafeForClient) {
            const { code, message, data, status } = javascript_1.pick(error, ["message", "code", "status", "data"]);
            throw new errors_1.CustomError(message, code, status, data);
        }
        throw new errors_1.CustomError("Something went wrong, please contact our support.", "INTERNAL_ERROR", 500, {});
    }
});
//# sourceMappingURL=errorInterceptor.js.map