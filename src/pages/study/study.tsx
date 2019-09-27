import cx from 'classnames';
import Taro, { useEffect, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { charConfig } from '@/configs';
import { IChar } from '@/interfaces';

import { CharList } from '@/components/CharList';
import { CharBanner } from '@/components/CharBanner';
import { MadeBy } from '@/components/MadeBy';
import { ShareMe } from '@/components/ShareMe';

import style from './style.less';

export default () => {
  const [selectedChar, setSelectedChar] = useState<IChar>();

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '拼音点读' }).then();

    setSelectedChar(charConfig.sm[0][0]);
  }, []);

  return (
    <View className={cx(style['wrapper'])}>
      <CharBanner selectedChar={selectedChar} />

      <View className={style['wrapper-scroll']}>
        <CharList
          charTitle="声母"
          charList={charConfig.sm}
          rowQuntity={6}
          selectedChar={selectedChar}
          onSelectedCharCallback={setSelectedChar}
        />

        <CharList
          charTitle="韵母"
          charList={charConfig.ym}
          rowQuntity={6}
          selectedChar={selectedChar}
          onSelectedCharCallback={setSelectedChar}
        />

        <CharList
          charTitle="整体认读"
          charList={charConfig.zt}
          rowQuntity={6}
          selectedChar={selectedChar}
          onSelectedCharCallback={setSelectedChar}
        />

        <View className={style['share-me']}>
          <ShareMe />
        </View>

        <View className={style['made-by']}>
          <MadeBy />
        </View>
      </View>
    </View>
  );
};
