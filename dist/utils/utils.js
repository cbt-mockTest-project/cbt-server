"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deduplication = exports.shuffleArray = exports.getCookie = exports.findUniqElem = void 0;
const findUniqElem = (arr1, arr2) => arr1
    .concat(arr2)
    .filter((item) => !arr1.includes(item) || !arr2.includes(item));
exports.findUniqElem = findUniqElem;
const getCookie = (cookie, key) => {
    const index = cookie.indexOf(key);
    if (index === -1) {
        return null;
    }
    const result = cookie.substring(index + (key.length + 1));
    return result;
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
//# sourceMappingURL=utils.js.map