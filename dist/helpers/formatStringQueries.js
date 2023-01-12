"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatStringQueries = void 0;
/**
 * Function to get KV pairs of required fields
 * @param queries query params passed to the API
 * @param stringFields array of fields which return string to pick from query params
 * @param arrayFields array of fields which return array (comma separated) to pick from query params
 * @returns object having keys contained in fields[]
 */
const formatStringQueries = (queries, stringFields, arrayFields) => Object.keys(queries).reduce((prevValue, query) => {
    var _a;
    let currentValue;
    if (stringFields.includes(query))
        currentValue = queries[query];
    if (arrayFields.includes(query))
        currentValue = (_a = queries[query]) === null || _a === void 0 ? void 0 : _a.split(","); // Convert comma separated string to array
    if (currentValue)
        return Object.assign(Object.assign({}, prevValue), { [query]: currentValue });
    return prevValue;
}, {});
exports.formatStringQueries = formatStringQueries;
