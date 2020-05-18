"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is = {
    match: (testFn, message = "") => (value, fieldValues) => !testFn(value, fieldValues) && message,
    required: () => (value) => isNilOrEmptyString(value) && "This file is required",
    minLength: (min) => (value) => !!value && value.length < min && `Must be at least ${min} character`,
    maxLength: (max) => (value) => !!value && value.length > max && `Must be one of: ${max} characters`,
    oneOf: (arr) => (value) => !!value && !arr.includes(value) && `Must be one of: ${arr.join(", ")}`,
    notEmptyArray: () => (value) => Array.isArray(value) &&
        value.length === 0 &&
        "Please add at least one item",
    email: () => (value) => !!value && !/.+@.+\..+/.test(value) && "Must be a valid email",
    url: () => (value) => !!value &&
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value) &&
        "Must be a valid URL"
};
const isNilOrEmptyString = (value) => value === undefined || value === null || value === "";
exports.generateErrors = (fieldValues, fieldValidators) => {
    const fieldErrors = {};
    Object.entries(fieldValidators).forEach(([fieldName, validators]) => {
        [validators].flat().forEach(validator => {
            const errorMessage = validator(fieldValues[fieldName], fieldValues);
            if (errorMessage !== false && !fieldErrors[fieldName]) {
                fieldErrors[fieldName] = errorMessage;
            }
        });
    });
    return fieldErrors;
};
exports.default = is;
//# sourceMappingURL=validations.js.map