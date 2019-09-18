import { IChar } from '../interfaces';

// prettier-ignore
export const charConfig: { [k: string]: IChar[][] } = {
  shengmu: [
    [
      { char: 'b', path: 'b' },
      { char: 'p', path: 'p' },
      { char: 'm', path: 'm' },
      { char: 'f', path: 'f' },
      { char: 'd', path: 'd' },
      { char: 't', path: 't' },
      { char: 'n', path: 'n' },
      { char: 'l', path: 'l' },
    ],
    [
      { char: 'g', path: 'g' },
      { char: 'k', path: 'k' },
      { char: 'h', path: 'h' },
      { char: 'j', path: 'j' },
      { char: 'q', path: 'q' },
      { char: 'x', path: 'x' },
    ],
    [
      { char: 'zh', path: 'zh' },
      { char: 'ch', path: 'ch' },
      { char: 'sh', path: 'sh' },
      { char: 'r', path: 'r' },
    ],
    [
      { char: 'z', path: 'z' },
      { char: 'c', path: 'c' },
      { char: 's', path: 's' },
      { char: 'y', path: 'y' },
      { char: 'w', path: 'w' },
    ],
  ],
  yunmu: [
    [
      { char: 'a', path: 'a' },
      { char: 'o', path: 'o' },
      { char: 'e', path: 'e' },
      { char: 'i', path: 'i' },
      { char: 'u', path: 'u' },
      { char: 'ü', path: 'v' },
    ],
    [
      { char: 'ai', path: 'ai' },
      { char: 'ei', path: 'ei' },
      { char: 'ui', path: 'ui' },
      { char: 'ao', path: 'ao' },
      { char: 'ou', path: 'ou' },
      { char: 'iu', path: 'iu' },
    ],
    [
      { char: 'ie', path: 'ie' },
      { char: 'üe', path: 've' },
      { char: 'er', path: 'er' },
      { char: 'an', path: 'an' },
      { char: 'en', path: 'en' },
      { char: 'in', path: 'in' },
    ],
    [
      { char: 'un', path: 'un' },
      { char: 'ün', path: 'vn' },
      { char: 'ang', path: 'ang' },
      { char: 'eng', path: 'eng' },
      { char: 'ing', path: 'ing' },
      { char: 'ong', path: 'ong' },
    ],
  ],
};
