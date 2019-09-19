import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, Button, Navigator } from '@tarojs/components';

import { IChar } from '@/interfaces';
import { charUtil } from '@/utils';
import { charConfig, voiceConfig } from '@/configs';

import style from './style.less';

interface IProps {
  selectedChar?: IChar;
  selectedHash?: number;
}

const mockData = [
  [{ char: 'b', ch: '播', path: 'b' }, { char: 'p', ch: '坡', path: 'p' }, { char: 'm', ch: '摸', path: 'm' }],
];

const playerCtx = Taro.createInnerAudioContext();

export const GameBanner = (props: IProps) => {
  // const [randomCharList, setRandomCharList] = useState<string[]>(charUtil.randomChar(charConfig.sm));
  const [randomCharList, setRandomCharList] = useState<string[]>(charUtil.randomChar(mockData));
  const [currentCharLength, setCurrentCharLength] = useState<number>(0);
  const [totalCharLength, setTotalCharLength] = useState<number>(0);
  const [rightLength, setRightLength] = useState<number>(0);

  const [playerStatus, setPlayerStatus] = useState<boolean>(false);

  const player = (src: string) => {
    if (playerStatus) {
      playerCtx.stop();
    }

    playerCtx.autoplay = true;
    playerCtx.loop = false;
    playerCtx.src = src;

    playerCtx.onPlay(() => {
      setPlayerStatus(true);
    });

    playerCtx.onEnded(() => {
      setPlayerStatus(false);
    });
  };

  const rePlaye = () => {
    player(voiceConfig[`vc${randomCharList[0]}`]);
  };

  useEffect(() => {
    setRandomCharList(randomCharList);
    setTotalCharLength(randomCharList.length);
    setCurrentCharLength(randomCharList.length);

    player(voiceConfig[`vc${randomCharList[0]}`]);
  }, []);

  useEffect(() => {
    if (!props.selectedChar || randomCharList.length === 0) {
      return;
    }

    if (props.selectedChar.char === randomCharList[0]) {
      console.log('😄 答对对啦！');
      setRightLength(rightLength + 1);
    } else {
      console.log('❌！');
    }

    randomCharList.shift();
    setRandomCharList(randomCharList);
    setCurrentCharLength(randomCharList.length);

    if (randomCharList.length) {
      player(voiceConfig[`vc${randomCharList[0]}`]);
    }
  }, [props.selectedHash]);

  return (
    <View className={style['wrapper']}>
      <View className={style['switch-page']}>
        <Navigator url="/pages/study/study">
          <Button size="mini" type="primary">
            学习
          </Button>
        </Navigator>
      </View>

      <View className={style['view-wrapper']}>
        <View className={style['random-list']}>
          {randomCharList.length === 0 ? (
            <View>
              <Text className={style['random-list-text']}>分数：{(rightLength / totalCharLength) * 100}</Text>
            </View>
          ) : (
            <View>
              <Text className={style['random-list-text']}>答对：{rightLength}</Text>
              <Text className={style['random-list-text']}>
                {' '}
                / 当前：{currentCharLength || '游戏结束'} / 总共：{totalCharLength}
              </Text>
            </View>
          )}
        </View>

        <View className={style['random-list']}>
          <Button onClick={() => rePlaye()}>重读</Button>
          <Text className={style['random-list-text']}>{JSON.stringify(randomCharList)}</Text>
        </View>

        <View className={style['selected-item']}>
          <Text className={style['selected-item-text']}>{props.selectedChar && props.selectedChar.char}</Text>
        </View>
      </View>
    </View>
  );
};
