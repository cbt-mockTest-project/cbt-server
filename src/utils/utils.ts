export const findUniqElem = <T>(arr1: T[], arr2: T[]) =>
  arr1
    .concat(arr2)
    .filter((item) => !arr1.includes(item) || !arr2.includes(item));

export const getCookie = (cookie: string, key: string) => {
  const reg = new RegExp(`(?=${key}).*(?=;)`, 'g');
  const match = cookie.match(reg);
  if (match) {
    return match[0].split('=')[1];
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
