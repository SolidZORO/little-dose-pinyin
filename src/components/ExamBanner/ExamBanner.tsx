import cx from 'classnames';
import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, Navigator, Progress, Image, Label, Checkbox, CheckboxGroup } from '@tarojs/components';

import { IChar } from '@/interfaces';
import { charUtil } from '@/utils';
import { charConfig, voiceConfig, sfxConfig } from '@/configs';

import { NavigatorButton } from '@/components/NavigatorButton';
import { ExamResultModal } from '@/components/ExamResultModal';

import iconstudy from '@/assets/icons/study.svg';
import iconexamwhire from '@/assets/icons/exam-white.svg';
import iconrefreshwhite from '@/assets/icons/refresh-white.svg';
import iconexamflag from '@/assets/icons/exam-flag.svg';

import style from './style.less';

interface IProps {
  selectedChar?: IChar;
  selectedHash?: number;
  startStatus?: boolean;
  onStatarCallback: (b: boolean) => void;
  onReStatarCallback: () => void;
  examRange: string[];
  onChangeExamRangeCallback: (arr: string[]) => void;
}

// const testData = [[{ char: 'b', ch: '播', path: 'b' }, { char: 'p', ch: '坡', path: 'p' }]];

const playerCtx = Taro.createInnerAudioContext();

export const ExamBanner = (props: IProps) => {
  const examRangeList: { text: string; value: string; checked: boolean }[] = [
    {
      text: '声母',
      value: 'sm',
      checked: props.examRange && props.examRange.includes('sm'),
    },
    {
      text: '韵母',
      value: 'ym',
      checked: props.examRange && props.examRange.includes('ym'),
    },
  ];

  const [rawChars, setRawChars] = useState<string[]>([]);
  const [examChars, setExamChars] = useState<string[]>([]);
  const [examCharsLength, setExamCharsLength] = useState<number>(0);
  const [examResultModalVisible, setExamResultModalVisible] = useState<boolean>(false);

  // 记录所有输入原始数据，用于排行榜，以及分析错误
  const [inputChars, setInputChars] = useState<string[]>([]);
  const [rightChars, setRightChars] = useState<string[]>([]);
  const [wrongChars, setWrongChars] = useState<string[]>([]);

  const [playerStatus, setPlayerStatus] = useState<boolean>(false);

  const player = (src: string) => {
    if (playerStatus) {
      playerCtx.stop();
    }

    playerCtx.autoplay = true;
    playerCtx.loop = false;
    playerCtx.src = src;
    playerCtx.play();

    playerCtx.onPlay(() => {
      setPlayerStatus(true);
    });

    playerCtx.onEnded(() => {
      setPlayerStatus(false);
    });
  };

  const playChar = () => {
    player(voiceConfig[`vc${examChars[0]}`]);
  };

  const calcPercent = (cl, sl): number => {
    // examChars.length, examCharsLength
    return Number((100 - (cl / sl) * 100).toFixed(1));
  };

  const requiredExamRangeTips = () => {
    Taro.showToast({ icon: 'none', title: `请至少选择一个，不然无法开始哦`, duration: 2000 }).then();
  };

  const buildExamRangeChars = () => {
    let examRangeChars = [];

    props.examRange.forEach(key => {
      // @ts-ignore
      examRangeChars = examRangeChars.concat(charConfig[key]);
    });

    return charUtil.randomChar(examRangeChars);
  };

  const onInitExamChars = (sourceChars: string[]) => {
    console.log('🔰 onInitExamChars');

    setExamChars(sourceChars);
    setExamCharsLength(sourceChars.length);

    // array copy
    setRawChars(sourceChars.concat());
  };

  // const onClearAllState = () => {
  //   setInputChars([]);
  //   setRightChars([]);
  //   setWrongChars([]);
  // };

  const onStart = () => {
    if (props.examRange && props.examRange.length === 0) {
      requiredExamRangeTips();

      return;
    }

    props.onStatarCallback(true);

    playChar();
  };

  const onChangeExamRangeCallback = (arr: []) => {
    if (arr.length === 0) {
      requiredExamRangeTips();
    }

    props.onChangeExamRangeCallback(arr);
  };

  const onSaveResult = () => {
    // TODO

    console.log('examChars', examChars);
    console.log('rawChars', rawChars);
    console.log('rightChars', rightChars);
    console.log('wrongChars', wrongChars);
  };

  useEffect(() => {
    onInitExamChars(buildExamRangeChars());
  }, [props.examRange]);

  useEffect(() => {
    if (!props.selectedChar || examChars.length === 0) {
      return;
    }

    setInputChars(inputChars.concat(props.selectedChar.char));

    if (props.selectedChar.char === examChars[0]) {
      player(sfxConfig.sfxright);

      Taro.showToast({ icon: 'success', title: '', duration: 300 }).then();
      setRightChars(rightChars.concat(examChars[0]));
    } else {
      player(sfxConfig.sfxwrong);

      Taro.showToast({ icon: 'none', title: `错啦～，正确为 ( ${examChars[0]} )`, duration: 1500 }).then();
      setWrongChars(wrongChars.concat(examChars[0]));
    }

    examChars.shift();
    setExamChars(examChars);

    if (examChars.length) {
      setTimeout(() => playChar(), 1000);
    } else {
      setExamResultModalVisible(true);
      onSaveResult();
    }
  }, [props.selectedHash]);

  return (
    <View className={style['wrapper']}>
      <View className={style['wrapper-inner']}>
        <NavigatorButton title="去学习" url="/pages/study/study" image={iconstudy} />

        <View className={style['main-wrapper']}>
          {!props.startStatus && !inputChars.length && (
            <View className={style['start-exam-wrapper']}>
              <View
                onClick={onStart}
                className={cx(style['start-exam-button'], style[`start-exam-button--${Taro.getEnv()}`], {
                  [style['start-exam-button--disable']]: props.examRange && props.examRange.length === 0,
                })}
              >
                <Image className={style['start-exam-button-image']} src={iconexamwhire} />
                <Text className={style['start-exam-button-text']}>开始测试</Text>
              </View>

              <View className={style['select-exam-range-wrapper']}>
                <CheckboxGroup
                  className={style['select-exam-range-checkboxgroup']}
                  onChange={e => onChangeExamRangeCallback(e.detail.value)}
                >
                  {examRangeList.map(item => (
                    <View
                      className={cx(
                        style['select-exam-range-label'],
                        style[`select-exam-range-label--${Taro.getEnv()}`],
                      )}
                    >
                      <Checkbox
                        key={item.value}
                        className={style['select-exam-range-checkbox']}
                        value={item.value}
                        checked={Boolean(props.examRange && props.examRange.includes(item.value))}
                      >
                        <Text className={style['select-exam-range-checkbox-text']}>{item.text}</Text>
                      </Checkbox>
                    </View>
                  ))}
                </CheckboxGroup>
              </View>
            </View>
          )}
          {props.startStatus && (
            <View className={style['progress-wrapper']}>
              <View className={style['progress-info']}>
                <Image className={style['progress-info-image']} src={iconexamflag} />
                <Text className={style['progress-info-text']}>
                  {inputChars.length} / {examCharsLength}
                </Text>
              </View>

              <Progress
                percent={calcPercent(examChars.length, examCharsLength)}
                strokeWidth={10}
                activeColor="#35cb67"
                borderRadius={Taro.getEnv() === 'WEAPP' ? 99 : 0}
                className={style['progress-bar']}
              />

              <View className={style['exit-exam-button']}>
                <Navigator url="/pages/exam/exam" type="reLaunch">
                  <Text className={style['exit-exam-button-text']}>退出测试</Text>
                </Navigator>
              </View>
            </View>
          )}
        </View>

        <ExamResultModal
          // visible
          visible={examResultModalVisible}
          inputChars={inputChars}
          rightChars={rightChars}
          wrongChars={wrongChars}
          examCharsLength={examCharsLength}
        />

        {/* <ExamResultModal */}
        {/*  // inputChars={['a', 'o', 'e', 'ong', 'ing', 'an', 'en', 'un', 'q', 'y']} */}
        {/*  // rightChars={['a', 'o', 'e', 'ong', 'ing', 'an', 'en', 'un', 'q', 'y']} */}
        {/*  // wrongChars={['a', 'o', 'e', 'ong', 'ing', 'an', 'en', 'un', 'q', 'y']} */}
        {/*  // examCharsLength={10} */}
        {/*  // examCharsLength={examCharsLength} */}
        {/*  // // 60 */}
        {/*  // inputChars={['a', 'o', 'e', 'ong', 'ing', 'an', 'en', 'un', 'q', 'y']} */}
        {/*  // rightChars={['ing', 'an', 'en', 'un', 'q', 'y']} */}
        {/*  // wrongChars={['a', 'o', 'e', 'ong']} */}
        {/*  // 59 */}
        {/*  // inputChars={['a', 'o', 'e', 'ong', 'ing', 'an', 'en', 'un', 'q', 'y']} */}
        {/*  // rightChars={[]} */}
        {/*  // wrongChars={['a', 'o', 'e', 'ong', 'ing', 'an', 'en', 'un', 'q', 'y']} */}
        {/*  // examCharsLength={10} */}
        {/*  // visible */}
        {/*  // 100 */}
        {/*  inputChars={['a', 'o', 'e', 'ong', 'ing', 'an', 'en', 'un', 'q', 'y']} */}
        {/*  rightChars={['a', 'o', 'e', 'ong', 'ing', 'an', 'en', 'un', 'q', 'y']} */}
        {/*  wrongChars={[]} */}
        {/*  examCharsLength={10} */}
        {/*  visible */}
        {/* /> */}
      </View>
    </View>
  );
};
