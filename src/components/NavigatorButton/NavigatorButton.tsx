import cx from 'classnames';
import Taro from '@tarojs/taro';
import { Text, Image, Navigator, View } from '@tarojs/components';

import style from './style.less';

interface IProps {
  title: string;
  image: any;
  url?: string;
  openType?: 'navigate' | 'redirect' | 'switchTab' | 'reLaunch' | 'navigateBack' | 'exit';
  style?: any;
  className?: string;
  disableShadow?: boolean;
}

export const NavigatorButton = (props: IProps) => {
  return (
    <View className={cx(style['wrapper'], props.className)} style={props.style}>
      <Navigator openType={props.openType || 'redirect'} url={props.url} className={style['nav-wrapper']}>
        <View
          className={cx(style['nav-button'], {
            [style['nav-button--disable-shadow']]: props.disableShadow,
          })}
        >
          <Image className={style['nav-button-image']} src={props.image} />
          <Text className={style['nav-button-text']}>{props.title}</Text>
        </View>
      </Navigator>
    </View>
  );
};
