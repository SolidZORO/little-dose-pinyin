import Taro from '@tarojs/taro';

import '@/assets/fonts/fi/iconfont';

interface IProps {
  type?: string;
  className?: string;
  size?: number;
  style?: any;
}

export const IconFont = (props: IProps) => {
  return (
    // prettier-ignore
    // @ts-ignore
    // eslint-disable-next-line max-len
    <svg className="icon" aria-hidden="true" style={{ ...props.style, width: `${props.size}px`, height: `${props.size}px` }}><use xlinkHref={`#icon-${props.type}`} /></svg>
  );
};
