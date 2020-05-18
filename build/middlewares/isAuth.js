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
const authToken_1 = require("@/utils/authToken");
const errors_1 = require("@/errors");
const models_1 = require("@/models");
exports.IsAuth = ({ context }, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = authToken_1.getAuthTokenFromRequest(context.req);
    if (!token) {
        throw new errors_1.InvalidTokenError("Authentication token not found.");
    }
    const userId = authToken_1.verifyToken(token).sub;
    if (!userId) {
        throw new errors_1.InvalidTokenError("Authentication token is invalid");
    }
    const user = yield models_1.User.findOne(userId);
    if (!user) {
        throw new errors_1.InvalidTokenError("Authentication token is invalid: User not found.");
    }
    context.req.currentUser = user;
    return next();
});
//# sourceMappingURL=isAuth.js.map