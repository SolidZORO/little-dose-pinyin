import cx from 'classnames';
import Taro, { useEffect, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { charConfig } from '@/configs';
import { IChar } from '@/interfaces';

import { CharList } from '@/components/CharList';
import { ExamBanner } from '@/components/ExamBanner';
import { NavigatorButton } from '@/components/NavigatorButton';

import style from './style.less';
import iconclock from '@/assets/icons/clock.svg';

export default () => {
  const [examRange, setExamRange] = useState<string[]>(['sm', 'ym']);
  const [selectedChar, setSelectedChar] = useState<IChar>();
  const [selectedHash, setSelectedHash] = useState<number>();
  const [startStatus, setStartStatus] = useState<boolean>(false);
  // const [startStatus, setStartStatus] = useState<boolean>(true);;

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '拼音测试' }).then();
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
    <View
      className={cx(style['page-wrapper'], style[`page-wrapper--${Taro.getEnv()}`], `page-wrapper--${Taro.getEnv()}`)}
    >
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

      {!startStatus && Taro.getStorageSync('has-history') && (
        <View className={style['nav-to-history-wrapper']}>
          <NavigatorButton
            disableShadow
            openType="navigate"
            title="查看历史成绩"
            url="/pages/history/history"
            image={iconclock}
            style={{ position: 'relative', left: 0, top: 2, boxShadow: 0 }}
            buttonWrapperStyle={{ padding: '5px' }}
          />
        </View>
      )}
    </View>
  );
};
