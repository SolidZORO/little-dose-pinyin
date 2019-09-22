import Taro from '@tarojs/taro';
import { Text, Navigator, View } from '@tarojs/components';

import style from './style.less';

export const MadeBy = () => {
  return (
    <View className={style['wrapper']}>
      <View className={style['madeby-wrapper']}>
        <Navigator url="/pages/about/about" className={style['madeby-nav']} type="switchTab">
          <Text className={style['madeby-made']}>Made by /</Text>
          <Text className={style['madeby-name']}>SolidZORO</Text>
        </Navigator>
      </View>
    </View>
  );
};