import Taro, { useState, useEffect } from '@tarojs/taro';
import { Text, Button, View, Input } from '@tarojs/components';

import style from './style.less';

export default () => {
  const [selectedChar, setSelectedChar] = useState();

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: 'pinyinx' }).then();
  }, []);

  return (
    <View className={style['wrapper']}>
      <Text>Game</Text>
    </View>
  );
};
