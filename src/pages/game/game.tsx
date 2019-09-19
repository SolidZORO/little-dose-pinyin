import Taro, { useEffect, useState } from '@tarojs/taro';
import { View, Navigator, Button } from '@tarojs/components';
import { charConfig } from '@/configs';
import { IChar } from '@/interfaces';

import { CharList } from '@/components/CharList';
import { GameBanner } from '@/components/GameBanner';

import style from './style.less';

export default () => {
  const [selectedChar, setSelectedChar] = useState<IChar>();
  const [selectedHash, setSelectedHash] = useState<number>();

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: 'Game' }).then();

    // setSelectedChar(charConfig.sm[1][4]);
  }, []);

  const onSetSelectedChar = (data: IChar) => {
    setSelectedChar(data);
    setSelectedHash(new Date().getTime());
  };

  return (
    <View className={style['wrapper']}>
      <GameBanner selectedChar={selectedChar} selectedHash={selectedHash} />

      <View className={style['wrapper-scroll']}>
        <CharList
          charTitle="声母"
          charList={charConfig.sm}
          rowQuntity={6}
          selectedChar={selectedChar}
          onSelectedCharCallback={onSetSelectedChar}
          disablePlayer
        />

        <CharList
          charTitle="韵母"
          charList={charConfig.ym}
          rowQuntity={6}
          selectedChar={selectedChar}
          onSelectedCharCallback={onSetSelectedChar}
          disablePlayer
        />
      </View>
    </View>
  );
};
