import cx from 'classnames';
import Taro, { useEffect, useState } from '@tarojs/taro';
import { View, Navigator, Button } from '@tarojs/components';
import { charConfig } from '@/configs';
import { IChar } from '@/interfaces';

import { CharList } from '@/components/CharList';
import { ExamBanner } from '@/components/ExamBanner';

import style from './style.less';

export default () => {
  const [examRange, setExamRange] = useState<string[]>(['sm', 'ym']);
  const [selectedChar, setSelectedChar] = useState<IChar>();
  const [selectedHash, setSelectedHash] = useState<number>();
  const [startStatus, setStartStatus] = useState<boolean>(false);
  // const [startStatus, setStartStatus] = useState<boolean>(true);

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '做测试' }).then();
  }, []);

  const onSetSelectedChar = (data: IChar) => {
    setSelectedChar(data);
    setSelectedHash(new Date().getTime());
  };

  const onStatarCallback = (status: boolean) => {
    setStartStatus(status);
    setSelectedHash(new Date().getTime());
  };

  const onReStatarCallback = () => {
    setStartStatus(true);
    setSelectedHash(new Date().getTime());
    setSelectedChar(undefined);
  };

  const onChangeExamRangeCallback = (arr: string[]) => {
    console.log(arr);
    setExamRange(arr);
  };

  return (
    <View className={cx(style['wrapper'])}>
      <ExamBanner
        examRange={examRange}
        selectedChar={selectedChar}
        selectedHash={selectedHash}
        onStatarCallback={onStatarCallback}
        onReStatarCallback={onReStatarCallback}
        onChangeExamRangeCallback={onChangeExamRangeCallback}
        startStatus={startStatus}
      />

      <View className={style['wrapper-scroll']}>
        {examRange.includes('sm') && (
          <CharList
            charTitle="声母"
            charList={charConfig.sm}
            rowQuntity={6}
            selectedChar={selectedChar}
            onSelectedCharCallback={onSetSelectedChar}
            disablePlayer
            disableClick={!startStatus}
          />
        )}

        {examRange.includes('ym') && (
          <CharList
            charTitle="韵母"
            charList={charConfig.ym}
            rowQuntity={6}
            selectedChar={selectedChar}
            onSelectedCharCallback={onSetSelectedChar}
            disablePlayer
            disableClick={!startStatus}
          />
        )}
      </View>
    </View>
  );
};
