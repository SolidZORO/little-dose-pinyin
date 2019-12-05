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
  buttonWrapperStyle?: {};
  disableShadow?: boolean;
}

export const NavigatorButton = (props: IProps) => {
  return (
    <View className={cx(style['component-wrapper'], props.className)} style={props.style}>
      <Navigator openType={props.openType || 'redirect'} url={props.url} className={style['nav-wrapper']}>
        <View className={style['nav-button-wrapper']} style={props.buttonWrapperStyle}>
          <View
            className={cx(style['nav-button-inner'], {
              [style['nav-button-inner--disable-shadow']]: props.disableShadow,
            })}
          >
            <Image className={style['nav-button-image']} src={props.image} />
            <Text className={style['nav-button-text']}>{props.title}</Text>
          </View>
        </View>
      </Navigator>
    </View>
  );
};
