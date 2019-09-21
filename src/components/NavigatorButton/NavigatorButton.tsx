import Taro from '@tarojs/taro';
import { Text, Image, Navigator, View } from '@tarojs/components';

import style from './style.less';

interface IProps {
  title: string;
  image: any;
  url: string;
}

export const NavigatorButton = (props: IProps) => {
  return (
    <View className={style['wrapper']}>
      <Navigator url={props.url} className={style['nav-wrapper']} type="switchTab">
        <View className={style['nav-button']}>
          <Image className={style['nav-button-image']} src={props.image} />
          <Text className={style['nav-button-text']}>{props.title}</Text>
        </View>
      </Navigator>
    </View>
  );
};
