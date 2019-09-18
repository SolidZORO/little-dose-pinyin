import Taro, { useEffect, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { charConfig } from '@/configs';
import { IChar } from '@/interfaces';

import { CharList } from './_components/CharList/CharList';
import { CharView } from './_components/CharView/CharView';

import style from './style.less';

export default () => {
  const [selectedChar, setSelectedChar] = useState<IChar>();

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: 'pinyinx' }).then();
  }, []);

  return (
    <View className={style['wrapper']}>
      <CharView selectedChar={selectedChar} />
      <CharList charList={charConfig.shengmu} rowQuntity={8} onSelectedCharCallback={setSelectedChar} />
      <CharList charList={charConfig.yunmu} rowQuntity={6} onSelectedCharCallback={setSelectedChar} />
    </View>
  );
};
