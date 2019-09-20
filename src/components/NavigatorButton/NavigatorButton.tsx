import Taro from '@tarojs/taro';
import { Text, Image, Navigator, Button, View } from '@tarojs/components';

import style from './style.less';

interface IProps {
  title: string;
  image: any;
  url: string;
}

export const NavigatorButton = (props: IProps) => {
  return (
    <View className={style['switch-page']}>
      <Navigator url={props.url}>
        <Button className={style['nav-button']}>
          <Image className={style['nav-button-image']} src={props.image} />
          <Text className={style['nav-button-text']}>{props.title}</Text>
        </Button>
      </Navigator>
    </View>
  );
};
