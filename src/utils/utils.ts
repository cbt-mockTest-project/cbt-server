export const findUniqElem = <T>(arr1: T[], arr2: T[]) =>
  arr1
    .concat(arr2)
    .filter((item) => !arr1.includes(item) || !arr2.includes(item));

export const getCookie = (cookie: string, key: string) => {
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

export const shuffleArray = <T = string | number>(array: Array<T>) => {
  return array.sort(() => Math.random() - 0.5);
};

export const deduplication = (array: any[]) => {
  const stack = [];
  for (const el of array) {
    const a = stack.findIndex(
      (stack_el) => JSON.stringify(stack_el) === JSON.stringify(el),
    );
    if (a === -1) {
      stack.push(el);
    }
  }
  return stack;
};
