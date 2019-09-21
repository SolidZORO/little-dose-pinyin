import { IChar } from '@/interfaces';
import { charConfig } from '@/configs';

const flatChar = (array: IChar[][]): string[] => {
  if (array.length === 0) {
    return [];
  }

  return array.map(i => i.map(j => j.char)).reduce((prev, next) => prev.concat(next));
};

const randomChar = (array: IChar[][]): string[] => flatChar(array).sort(() => (Math.random() > 0.5 ? -1 : 1));

const findCharObject = (key: string) => {
  const allChars = [Object.keys(charConfig).map(i => charConfig[i])].flat(3);

  return allChars.find(c => c.char === key);
};

export const charUtil = {
  flatChar,
  randomChar,
  findCharObject,
};
