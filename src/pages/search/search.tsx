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

    setSelectedChar(charConfig.sm[1][4]);
  }, []);

  return (
    <View className={style['wrapper']}>
      <CharView selectedChar={selectedChar} />

      <CharList
        charList={charConfig.sm}
        rowQuntity={8}
        selectedChar={selectedChar}
        onSelectedCharCallback={setSelectedChar}
      />

      <CharList
        charList={charConfig.ym}
        rowQuntity={6}
        selectedChar={selectedChar}
        onSelectedCharCallback={setSelectedChar}
      />

      <CharList
        charList={charConfig.zt}
        rowQuntity={6}
        selectedChar={selectedChar}
        onSelectedCharCallback={setSelectedChar}
      />
    </View>
  );
};
