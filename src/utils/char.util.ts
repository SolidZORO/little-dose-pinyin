import { IChar } from '@/interfaces';

const flatChar = (array: IChar[][]) => array.map(i => i.map(j => j.char)).reduce((prev, next) => prev.concat(next));
const randomChar = (array: IChar[][]) => flatChar(array).sort(() => (Math.random() > 0.5 ? -1 : 1));

export const charUtil = {
  flatChar,
  randomChar,
};
