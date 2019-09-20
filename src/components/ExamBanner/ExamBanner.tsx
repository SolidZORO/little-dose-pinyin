import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, Button, Navigator, Progress } from '@tarojs/components';

import { IChar } from '@/interfaces';
import { charUtil } from '@/utils';
import { charConfig, voiceConfig, sfxConfig } from '@/configs';
import { NavigatorButton } from '@/components/NavigatorButton';

import iconstudy from '@/assets/icons/study.svg';
import iconright from '@/assets/icons/right.svg';
import iconwrong from '@/assets/icons/wrong.svg';

import style from './style.less';

interface IProps {
  selectedChar?: IChar;
  selectedHash?: number;
  startStatus?: boolean;
  onStatarCallback: (b: boolean) => void;
  onReStatarCallback: () => void;
}

// const testData = [
//   [{ char: 'b', ch: '播', path: 'b' }, { char: 'p', ch: '坡', path: 'p' }, { char: 'm', ch: '摸', path: 'm' }],
// ];

const testData = [[{ char: 'b', ch: '播', path: 'b' }, { char: 'p', ch: '坡', path: 'p' }]];

const playerCtx = Taro.createInnerAudioContext();

export const ExamBanner = (props: IProps) => {
  const [sourceChars, setSourceChars] = useState<string[]>(charUtil.randomChar(testData));
  // const [sourceChars, setSourceChars] = useState<string[]>(charUtil.randomChar(charConfig.sm));
  const [sourceLength, setSourceLength] = useState<number>(0);

  // 记录所有输入原始数据，用于排行榜，以及分析错误
  const [inputChars, setInputChars] = useState<string[]>([]);
  const [rightChars, setRightChars] = useState<string[]>([]);
  const [wrongChars, setWrongChars] = useState<string[]>([]);

  const [playerStatus, setPlayerStatus] = useState<boolean>(false);

  const onInitSourceChars = (srcChars: string[]) => {
    setSourceChars(srcChars);
    setSourceLength(srcChars.length);
  };

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

  const playChar = () => {
    player(voiceConfig[`vc${sourceChars[0]}`]);
  };

  const calcPercent = (cl, sl): number => {
    // sourceChars.length, sourceLength
    return Number((100 - (cl / sl) * 100).toFixed(1));
  };

  const calcScore = (rl, sl): number => {
    // rightChars.length, sourceLength
    const reuslt = Math.floor(Number((rl / sl) * 100));

    return !Number.isNaN(reuslt) ? reuslt : 0;
  };

  const onClearAllState = () => {
    setInputChars([]);
    setRightChars([]);
    setWrongChars([]);
  };

  const onStart = () => {
    props.onStatarCallback(true);

    playChar();
  };

  const onRestart = () => {
    props.onReStatarCallback();

    // here do not use `useState`
    const newSourceChars = charUtil.randomChar(testData);

    onClearAllState();
    onInitSourceChars(newSourceChars);

    player(voiceConfig[`vc${newSourceChars[0]}`]);
  };

  useEffect(() => {
    onInitSourceChars(charUtil.randomChar(testData));
  }, []);

  useEffect(() => {
    if (!props.selectedChar || sourceChars.length === 0) {
      return;
    }

    setInputChars(inputChars.concat(props.selectedChar.char));

    if (props.selectedChar.char === sourceChars[0]) {
      player(sfxConfig.sfxright);

      Taro.showToast({ image: iconright, title: '', duration: 800 }).then();
      setRightChars(rightChars.concat(sourceChars[0]));
    } else {
      player(sfxConfig.sfxwrong);

      Taro.showToast({ image: iconwrong, title: '', duration: 800 }).then();
      setWrongChars(wrongChars.concat(sourceChars[0]));
    }

    sourceChars.shift();
    setSourceChars(sourceChars);

    if (sourceChars.length) {
      setTimeout(() => playChar(), 800);
    } else {
      props.onStatarCallback(false);
    }
  }, [props.selectedHash]);

  return (
    <View className={style['wrapper']}>
      <NavigatorButton title="去学习" url="/pages/study/study" image={iconstudy} />

      <View className={style['main-wrapper']}>
        {!props.startStatus && (
          <View onClick={onStart}>
            <Text>开始咯～</Text>
          </View>
        )}
        {props.startStatus && inputChars.length !== sourceLength && (
          <View className={style['progress-bar']}>
            <View className={style['progress-total']}>
              {inputChars.length} / {sourceLength}
            </View>
            <Progress
              percent={calcPercent(sourceChars.length, sourceLength)}
              active
              strokeWidth={4}
              className={style['progress-bar']}
            />
          </View>
        )}
        {inputChars.length === sourceLength && (
          <View onClick={onRestart}>
            <Text>游戏结束 {calcScore(rightChars.length, sourceLength)} 分</Text>
            <Text>重来</Text>
          </View>
        )}
      </View>
    </View>
  );
};
