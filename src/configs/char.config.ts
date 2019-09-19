import { IChar } from '../interfaces';

// prettier-ignore
export const charConfig: { [k: string]: IChar[][] } = {
  sm: [
    [
      { char: 'b', ch: '播', path: 'b' },
      { char: 'p', ch: '坡', path: 'p' },
      { char: 'm', ch: '摸', path: 'm' },
      { char: 'f', ch: '佛', path: 'f' },
      { char: 'd', ch: '得', path: 'd' },
      { char: 't', ch: '特', path: 't' },
      { char: 'n', ch: '呢', path: 'n' },
      { char: 'l', ch: '勒', path: 'l' },
    ],
    [
      { char: 'g', ch: '鸽', path: 'g' },
      { char: 'k', ch: '科', path: 'k' },
      { char: 'h', ch: '喝', path: 'h' },
      { char: 'j', ch: '鸡', path: 'j' },
      { char: 'q', ch: '气', path: 'q' },
      { char: 'x', ch: '西', path: 'x' },
    ],
    [
      { char: 'zh', ch: '织', path: 'zh' },
      { char: 'ch', ch: '吃', path: 'ch' },
      { char: 'sh', ch: '师', path: 'sh' },
      { char: 'r', ch: '日', path: 'r' },
    ],
    [
      { char: 'z', ch: '字', path: 'z' },
      { char: 'c', ch: '刺', path: 'c' },
      { char: 's', ch: '丝', path: 's' },
      { char: 'y', ch: '衣', path: 'y' },
      { char: 'w', ch: '乌', path: 'w' },
    ],
  ],
  ym: [
    [
      { char: 'a', ch: '啊', path: 'a' },
      { char: 'o', ch: '喔', path: 'o' },
      { char: 'e', ch: '鹅', path: 'e' },
      { char: 'i', ch: '衣', path: 'i' },
      { char: 'u', ch: '乌', path: 'u' },
      { char: 'ü', ch: '鱼', path: 'v' },
    ],
    [
      { char: 'ai', ch: '哀', path: 'ai' },
      { char: 'ei', ch: '欸', path: 'ei' },
      { char: 'ui', ch: '喂', path: 'ui' },
      { char: 'ao', ch: '袄', path: 'ao' },
      { char: 'ou', ch: '欧', path: 'ou' },
      { char: 'iu', ch: '邮', path: 'iu' },
    ],
    [
      { char: 'ie', ch: '椰', path: 'ie' },
      { char: 'üe', ch: '月', path: 've' },
      { char: 'er', ch: '耳', path: 'er' },
      { char: 'an', ch: '安', path: 'an' },
      { char: 'en', ch: '摁', path: 'en' },
      { char: 'in', ch: '音', path: 'in' },
    ],
    [
      { char: 'un', ch: '蚊', path: 'un' },
      { char: 'ün', ch: '晕', path: 'vn' },
      { char: 'ang', ch: '昂', path: 'ang' },
      { char: 'eng', ch: ' / ', path: 'eng' },
      { char: 'ing', ch: '鹰', path: 'ing' },
      { char: 'ong', ch: ' / ', path: 'ong' },
    ],
  ],
  zt: [
    [
      { char: 'zhi', ch: '蜘', path: 'zhi', img: 'zh' },
      { char: 'chi', ch: '吃', path: 'chi', img: 'ch' },
      { char: 'shi', ch: '师', path: 'shi', img: 'sh' },
      { char: 'ri', ch: '日', path: 'ri', img: 'r' },
    ],
    [
      { char: 'zi', ch: '吱', path: 'zi', img: 'z' },
      { char: 'ci', ch: '词', path: 'ci', img: 'c' },
      { char: 'si', ch: '丝', path: 'si', img: 's' },
      { char: 'yi', ch: '衣', path: 'yi', img: 'y' },
      { char: 'wu', ch: '屋', path: 'wu', img: 'w' },
      { char: 'yu', ch: '鱼', path: 'yu', img: 'v' },
    ],
    [
      { char: 'ye', ch: '椰', path: 'ye', img: 'ie' },
      { char: 'yue', ch: '月', path: 'yue', img: 've' },
      { char: 'yuan', ch: '圆', path: 'yuan' },
    ],
    [
      { char: 'yin', ch: '音', path: 'yin', img: 'in' },
      { char: 'yun', ch: '晕', path: 'yun', img: 'vn' },
      { char: 'ying', ch: '鹰', path: 'ying', img: 'ing' },
    ],
  ],
};
