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
const models_1 = require("@/models");
const errors_1 = require("@/errors");
const validations_1 = require("@/utils/validations");
const entites = {
    Comment: models_1.Comment,
    Issue: models_1.Issue,
    Project: models_1.Project,
    User: models_1.User,
};
exports.findEntityOrThrow = (Constructor, options) => __awaiter(void 0, void 0, void 0, function* () {
    const instance = options.id ? yield Constructor.findOne(options.id, options.options) : yield Constructor.findOne(options.options);
    if (!instance) {
        throw new errors_1.EntityNotFoundError(Constructor.name);
    }
    return instance;
});
exports.validateAndSaveEntity = (instance) => __awaiter(void 0, void 0, void 0, function* () {
    const Constructor = entites[instance.constructor.name];
    if ("validations" in Constructor) {
        const errorFields = validations_1.generateErrors(instance, Constructor.validations);
        console.log("ErrorFields " + JSON.stringify(errorFields));
        if (Object.keys(errorFields).length > 0) {
            throw new errors_1.BadUserInputError({ fields: errorFields });
        }
    }
    return instance.save();
});
exports.createEntity = (Constructor, input) => __awaiter(void 0, void 0, void 0, function* () {
    const instance = Constructor.create(input);
    if (instance instanceof models_1.User) {
        instance.hashPassword();
    }
    return exports.validateAndSaveEntity(instance);
});
exports.updateEntity = (Constructor, id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const instance = yield exports.findEntityOrThrow(Constructor, { id });
    Object.assign(instance, input);
    return exports.validateAndSaveEntity(instance);
});
exports.deleteEntity = (Constructor, id) => __awaiter(void 0, void 0, void 0, function* () {
    const instance = yield exports.findEntityOrThrow(Constructor, { id });
    yield instance.remove();
    return instance;
});
//# sourceMappingURL=typeorm.js.map