import cx from 'classnames';
import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, Navigator, Progress, Image, Checkbox, CheckboxGroup } from '@tarojs/components';

import { IChar } from '@/interfaces';
import { charUtil } from '@/utils';
import { charConfig, voiceConfig, sfxConfig } from '@/configs';

import { NavigatorButton } from '@/components/NavigatorButton';
import { ExamResultModal } from '@/components/ExamResultModal';

import iconstudy from '@/assets/icons/study.svg';
import iconexamwhire from '@/assets/icons/exam-white.svg';
import iconexamflag from '@/assets/icons/exam-flag.svg';
import iconreplay from '@/assets/icons/replay.svg';

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
const sfxPlayerCtx = Taro.createInnerAudioContext();
const typePlayerCtx = Taro.createInnerAudioContext();

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

  // 对/错音效
  const sfxPlayer = (src: string) => {
    sfxPlayerCtx.autoplay = true;
    sfxPlayerCtx.loop = false;
    sfxPlayerCtx.src = src;
    sfxPlayerCtx.play();
  };

  // 声母/韵母提示
  const typePlayer = (src: string) => {
    typePlayerCtx.autoplay = true;
    typePlayerCtx.loop = false;
    typePlayerCtx.src = src;
    typePlayerCtx.play();
  };

  const playChar = () => {
    const charVoice = voiceConfig[`vc${charUtil.findCharObject(examChars[0]).path}`];
    const smList = ['y', 'w', 'v'];
    const ymList = ['i', 'u', 'yu'];

    if (props.examRange && props.examRange.length > 1) {
      if (smList.includes(examChars[0])) {
        typePlayer(sfxConfig.sfxsm);
        setTimeout(() => player(charVoice), 1200);

        return;
      }

      if (ymList.includes(examChars[0])) {
        typePlayer(sfxConfig.sfxym);
        setTimeout(() => player(charVoice), 1200);

        return;
      }
    }

    player(charVoice);
  };

  const calcPercent = (cl, sl): number => {
    // examChars.length, examCharsLength
    return Number((100 - (cl / sl) * 100).toFixed(1));
  };

  const requiredExamRangeTips = () => {
    Taro.showToast({ icon: 'none', title: '请至少选择一个，不然无法开始哦', duration: 2000 }).then();
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

  useEffect(() => {
    onInitExamChars(buildExamRangeChars());
  }, [props.examRange]);

  useEffect(() => {
    if (!props.selectedChar || examChars.length === 0) {
      return;
    }

    setInputChars(inputChars.concat(props.selectedChar.char));

    if (props.selectedChar.char === examChars[0]) {
      sfxPlayer(sfxConfig.sfxright);

      Taro.showToast({ icon: 'success', title: '', duration: 300 }).then();
      setRightChars(rightChars.concat(examChars[0]));
    } else {
      sfxPlayer(sfxConfig.sfxwrong);

      Taro.showToast({ icon: 'none', title: `选错咯～ 答案是 [ ${examChars[0]} ]`, duration: 1500 }).then();
      setWrongChars(wrongChars.concat(examChars[0]));
    }

    examChars.shift();
    setExamChars(examChars);

    if (examChars.length) {
      setTimeout(() => playChar(), 1000);
    } else {
      setExamResultModalVisible(true);
    }
  }, [props.selectedHash]);

  return (
    <View
      className={cx(
        style['component-wrapper'],
        style[`component-wrapper--${Taro.getEnv()}`],
        `component-wrapper--${Taro.getEnv()}`,
      )}
    >
      <View className={style['component-wrapper-inner']}>
        <NavigatorButton
          title="学拼音"
          url="/pages/study/study"
          image={iconstudy}
          buttonWrapperStyle={{ padding: '1px 15px 20px 15px' }}
        />

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
                      key={item.value}
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
                <Navigator openType="redirect" url="/pages/exam/exam">
                  <Text className={style['exit-exam-button-text']}>退出测试</Text>
                </Navigator>
              </View>

              <View className={style['icon-replay']} onClick={() => playChar()}>
                <Image
                  className={cx(style['icon-replay-image'], {
                    [style['icon-replay-image--action']]: playerStatus,
                  })}
                  src={iconreplay}
                />
              </View>
            </View>
          )}
        </View>

        {examResultModalVisible && (
          <ExamResultModal
            // visible
            visible={examResultModalVisible}
            rawChars={rawChars}
            examRange={props.examRange}
            inputChars={inputChars}
            rightChars={rightChars}
            examCharsLength={examCharsLength}
            wrongChars={wrongChars}
            // wrongChars={['a', 'o', 'e', 'ong', 'ing', 'an', 'en', 'un', 'q', 'y']}
          />
        )}
      </View>
    </View>
  );
};
