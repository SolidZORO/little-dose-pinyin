import cx from 'classnames';
import Taro from '@tarojs/taro';
import { Text, Navigator, View } from '@tarojs/components';

import style from './style.less';

export const MadeBy = () => {
  console.log(Taro.getEnv());
  return (
    <View
      className={cx(
        style['component-wrapper'],
        style[`component-wrapper--${Taro.getEnv()}`],
        `component-wrapper--${Taro.getEnv()}`,
      )}
    >
      <View className={cx(style['madeby-wrapper'], style[`madeby-wrapper--${Taro.getEnv()}`])}>
        <Navigator openType="navigate" url="/pages/about/about" className={style['madeby-nav']}>
          <Text className={style['madeby-made']}>Made by /</Text>
          <Text className={style['madeby-name']}>SolidZORO</Text>
        </Navigator>
      </View>
    </View>
  );
};
