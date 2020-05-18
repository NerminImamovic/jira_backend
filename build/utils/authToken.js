"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("@/errors");
let isPlainObject = (value) => {
    return Object.prototype.toString.call(value) === "[object Object]";
};
exports.signToken = (payload, options) => jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, Object.assign({ expiresIn: "180 days" }, options));
exports.verifyToken = (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (isPlainObject(payload)) {
            return payload;
        }
        throw new Error();
    }
    catch (error) {
        throw new errors_1.InvalidTokenError();
    }
};
exports.getAuthTokenFromRequest = (req) => {
    const header = req.get("Authorization") || "";
    const [bearer, token] = header.split(" ");
    return bearer === "Bearer" && token ? token : null;
};
//# sourceMappingURL=authToken.js.map