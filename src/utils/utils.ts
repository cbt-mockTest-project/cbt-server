export const findUniqElem = <T>(arr1: T[], arr2: T[]) =>
  arr1
    .concat(arr2)
    .filter((item) => !arr1.includes(item) || !arr2.includes(item));
