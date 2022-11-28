export const findUniqElem = <T>(arr1: T[], arr2: T[]) =>
  arr1
    .concat(arr2)
    .filter((item) => !arr1.includes(item) || !arr2.includes(item));

export const getCookie = (cookie: string, key: string) => {
  const index = cookie.indexOf(key);
  if (index === -1) {
    return null;
  }
  const result = cookie.substring(index + (key.length + 1));
  return result;
};
