import { Between, Check } from 'typeorm';
import { addYears, subYears } from 'date-fns';
import { User } from 'src/users/entities/user.entity';

export const AfterDate = (date: Date) => Between(date, addYears(date, 100));
export const BeforeDate = (date: Date) => Between(subYears(date, 100), date);

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

export const isIntrospectionQuery = (
  operationName: string | undefined,
  query: string | undefined,
): boolean =>
  operationName === 'IntrospectionQuery' ||
  (query !== undefined && query.includes('__schema'));

export const ellipsisText = (string: string, count: number) =>
  string.slice(0, count) + '...';

export const escapeRegExp = (text: string): string => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const countWordInText = (text: string, word: string): number => {
  const escapedWord = escapeRegExp(word);
  const regex = new RegExp(`${escapedWord}`, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
};
