import dayjs from 'dayjs';
import cx from 'classnames';
import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, Image, Navigator } from '@tarojs/components';

import { charUtil, examUtil } from '@/utils';
import { CharItem } from '@/components/CharItem';
import { ExamResultTotal } from '@/components/ExamResultTotal';

import iconexam from '@/assets/icons/exam.svg';

import style from './style.less';
import { IHistory, IHistoryStorage } from '@/interfaces';
import { ShareMe } from '@/components/ShareMe';

interface IProps {
  visible: boolean;
  rawChars: string[];
  inputChars: string[];
  rightChars: string[];
  wrongChars: string[];
  examRange: string[];
  examCharsLength: number;
}

export const ExamResultModal = (props: IProps) => {
  const [score] = useState<number>(
    examUtil.calcScoreNumber(props.rightChars && props.rightChars.length, props.examCharsLength),
  );

  // const score = 100;

  const onSaveResult = () => {
    const timestamp = new Date().getTime();
    const dateYmd = dayjs(timestamp).format('YYYYMMDD');
    const currentHistoryName = `history-${dateYmd}`;
    // const score = examUtil.calcScoreNumber(props.rightChars.length, props.examCharsLength);

    const result: IHistory = {
      timestamp,
      score,
      examRange: props.examRange,
      rawChars: props.rawChars,
      inputChars: props.inputChars,
      rightChars: props.rightChars,
      wrongChars: props.wrongChars,
    };

    const storageInfo = Taro.getStorageInfoSync();

    Taro.setStorageSync('has-history', 1);

    if (storageInfo.keys.includes(currentHistoryName)) {
      // append
      const data: IHistoryStorage = Taro.getStorageSync(currentHistoryName);
      data.data.push(result);

      Taro.setStorageSync(currentHistoryName, data);
    } else {
      // create
      Taro.setStorageSync(currentHistoryName, { historyName: currentHistoryName, data: [result] });
    }
  };

  useEffect(() => onSaveResult(), []);

  const calcScoreText = () => {
    let title = '👍 成绩不错，要继续加油哦～';

    switch (true) {
      case score === 100:
        // eslint-disable-next-line no-irregular-whitespace
        title = '　🥳 天啊！居然得了满分！优秀～';
        break;
      case score >= 90:
        title = '🎉 好厉害！差一点点就满分了～';
        break;
      case score === 60:
        title = '好惊险啊啊啊啊啊，😂 压线过局！';
        break;
      case score < 60 && score > 0:
        title = '️测试不合格！💔 要加油咯～';
        break;
      case score === 0:
        title = '😈 您已解锁「真﹒️硫酸手」成就～';
        break;
      default:
        console.log(score);
    }

    return title;
  };

  return (
    <View
      className={cx(
        style['component-wrapper'],
        style[`component-wrapper--${Taro.getEnv()}`],
        `component-wrapper--${Taro.getEnv()}`,
        {
          [style['component-wrapper--visible']]: props.visible,
        },
      )}
    >
      <View className={style['modal-inner']}>
        <View className={style['modal-header']}>
          <Image className={style['score-number-title-icon']} src={iconexam} />
          <Text className={style['score-number']}>本次成绩 {score} 分</Text>
          <View className={style['right-and-wrong-info']}>
            <ExamResultTotal
              examCharsLength={props.examCharsLength}
              rightCharsLength={props.rightChars && props.rightChars.length}
              wrongCharsLength={props.wrongChars && props.wrongChars.length}
              paddingWidth={8}
            />
          </View>
        </View>

        <View className={style['modal-body']}>
          <View className={cx(style['score-content'], style[`score-content--${score}`])}>
            <Text className={style['score-content-text']}>{calcScoreText()}</Text>

            {score === 100 && (
              <View className={style['score-content-emoji']}>
                {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                <Text className={style['score-content-emoji-inner']}>🎉 </Text>
              </View>
            )}
          </View>

          {props.wrongChars && props.wrongChars.length > 0 && (
            <View className={style['wrong-char-wrapper']}>
              <View className={style['wrong-char-title']}>
                <Text className={style['wrong-char-title-text']}>
                  本次错题项共 {props.wrongChars.length} 个（点击字母可发音）
                </Text>
              </View>
              <View className={style['wrong-char-x-scroll-wrapper']}>
                <View
                  className={style['wrong-char-x-scroll-inner']}
                  style={{ width: `${props.wrongChars.length * 70}px` }}
                >
                  {props.wrongChars.map(w => (
                    <View className={style['wrong-char-item']} key={w}>
                      <CharItem charItem={charUtil.findCharObject(w)} />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>

        <View className={style['modal-footer']}>
          <Navigator
            openType="redirect"
            url="/pages/exam/exam"
            className={cx(style['close-modal-button'], style[`close-modal-button--${Taro.getEnv()}`])}
          >
            <Text className={style['close-modal-button-text']}>返回测试</Text>
          </Navigator>

          <View className={style['share-me']}>
            <ShareMe />
          </View>
        </View>
      </View>
    </View>
  );
};
