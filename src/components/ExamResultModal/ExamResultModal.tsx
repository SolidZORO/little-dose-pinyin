import cx from 'classnames';
import Taro from '@tarojs/taro';
import { View, Text, Image, Navigator } from '@tarojs/components';

import { charUtil } from '@/utils';
import { CharItem } from '@/components/CharItem';

import iconexam from '@/assets/icons/exam.svg';

import style from './style.less';

interface IProps {
  visible: boolean;
  inputChars: string[];
  rightChars: string[];
  wrongChars: string[];
  examCharsLength: number;
}

export const ExamResultModal = (props: IProps) => {
  const calcScoreNumber = (): number => {
    const result = Math.floor(Number((props.rightChars.length / props.examCharsLength) * 100));

    return !Number.isNaN(result) ? result : 0;
  };

  const score = calcScoreNumber();

  const calcScoreText = () => {
    let title = `成绩不错，要加油咯～`;

    switch (true) {
      case score === 100:
        title = `👍 天！居然得满分！太太太秀了～`;
        break;
      case score >= 90:
        title = `好厉害，差一点点就满分咯～`;
        break;
      case score === 60:
        title = `好惊险啊啊啊啊啊，😂 压线过局！`;
        break;
      case score < 60 && score > 0:
        title = `️测试不合格！💔 要加油咯～`;
        break;
      case score === 0:
        title = `🥳 真的酷！️硫酸手成就达成～`;
        break;
      default:
        console.log(score);
    }

    return title;
  };

  return (
    <View
      className={cx(style['wrapper'], {
        [style['wrapper--visible']]: props.visible,
      })}
    >
      <View className={style['modal-inner']}>
        <View className={style['modal-header']}>
          <Image className={style['score-number-title-icon']} src={iconexam} />
          <Text className={style['score-number']}>本次成绩 {score} 分</Text>
          <View className={style['right-and-wrong-info']}>
            <Text className={style['right-and-wrong-info-text']}>共 {props.examCharsLength}</Text>
            <Text className={style['right-and-wrong-info-text']}>对 {props.rightChars.length}</Text>
            <Text className={style['right-and-wrong-info-text']}>错 {props.wrongChars.length}</Text>
          </View>
        </View>

        <View className={style['modal-body']}>
          <View className={style['score-content']}>
            <Text className={style['score-content-text']}>{calcScoreText()}</Text>
          </View>

          {props.wrongChars && props.wrongChars.length > 0 && (
            <View className={style['wrong-char-wrapper']}>
              <View className={style['wrong-char-title']}>
                <Text className={style['wrong-char-title-text']}>
                  错题项 {props.wrongChars.length} 个 / 点击字母可发音
                </Text>
              </View>
              <View className={style['wrong-char-x-scroll-wrapper']}>
                <View
                  className={style['wrong-char-x-scroll-inner']}
                  style={{ width: `${props.wrongChars.length * 70}px` }}
                >
                  {props.wrongChars.map(w => (
                    <View key={w} className={style['wrong-char-item']}>
                      <CharItem charItem={charUtil.findCharObject(w)} />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>

        <View className={style['modal-footer']}>
          <View className={cx(style['close-modal-button'], style[`close-modal-button--${Taro.getEnv()}`])}>
            <Navigator url="/pages/exam/exam" type="reLaunch">
              <Text className={style['close-modal-button-text']}>返回测试</Text>
            </Navigator>
          </View>
        </View>
      </View>
    </View>
  );
};
