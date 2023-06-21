"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ellipsisText = exports.isIntrospectionQuery = exports.deduplication = exports.shuffleArray = exports.getCookie = exports.findUniqElem = exports.BeforeDate = exports.AfterDate = void 0;
const typeorm_1 = require("typeorm");
const date_fns_1 = require("date-fns");
const AfterDate = (date) => (0, typeorm_1.Between)(date, (0, date_fns_1.addYears)(date, 100));
exports.AfterDate = AfterDate;
const BeforeDate = (date) => (0, typeorm_1.Between)((0, date_fns_1.subYears)(date, 100), date);
exports.BeforeDate = BeforeDate;
const findUniqElem = (arr1, arr2) => arr1
    .concat(arr2)
    .filter((item) => !arr1.includes(item) || !arr2.includes(item));
exports.findUniqElem = findUniqElem;
const getCookie = (cookie, key) => {
    const cookieObj = cookie
        .split(';')
        .map((v) => v.split('='))
        .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
    }, {});
    if (cookieObj[key]) {
        return cookieObj[key];
    }
    return null;
};
exports.getCookie = getCookie;
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};
exports.shuffleArray = shuffleArray;
const deduplication = (array) => {
    const stack = [];
    for (const el of array) {
        const a = stack.findIndex((stack_el) => JSON.stringify(stack_el) === JSON.stringify(el));
        if (a === -1) {
            stack.push(el);
        }
    }
    return stack;
};
exports.deduplication = deduplication;
const isIntrospectionQuery = (operationName, query) => operationName === 'IntrospectionQuery' ||
    (query !== undefined && query.includes('__schema'));
exports.isIntrospectionQuery = isIntrospectionQuery;
const ellipsisText = (string, count) => string.slice(0, count) + '...';
exports.ellipsisText = ellipsisText;
//# sourceMappingURL=utils.js.map