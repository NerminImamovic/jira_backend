"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};
//# sourceMappingURL=javascript.js.map