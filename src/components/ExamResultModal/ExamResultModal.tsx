import Taro, { useState } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import { IChar } from '@/interfaces';

import { charUtil } from '@/utils';
import { CharItem } from '@/components/CharItem';

import style from './style.less';

interface IProps {
  inputChars: string[];
  rightChars: string[];
  wrongChars: string[];
  examCharLength: number;
}

export const ExamResultModal = (props: IProps) => {
  const calcScore = (rl, sl): number => {
    // rightChars.length, examCharLength
    const reuslt = Math.floor(Number((rl / sl) * 100));

    return !Number.isNaN(reuslt) ? reuslt : 0;
  };

  const buildScoreModalContent = () => {
    return props.wrongChars.toString();
  };

  const buildScoreModalTitle = () => {
    const score = calcScore(props.rightChars.length, props.examCharLength);

    let title = `本次成绩：${score} 分，\n测试不合格，继续加油哦～`;

    if (score === 100) {
      title = `本次成绩：${score} 分！真的太棒棒棒啦！ 👍👍👍`;
    } else if (score >= 90) {
      title = `本次成绩：${score} 分，好厉害，差一点点就满分咯～`;
    } else if (score >= 60) {
      title = `本次成绩：${score} 分，测试不合格，继续加油哦～`;
    }

    return title;
  };

  console.log(charUtil.findCharObject('a'));

  return (
    <View className={style['wrapper']}>
      <View className={style['modal-inner']}>
        <View className={style['modal-header']}>
          <Text className={style['score-number']}>本次成绩 69 分</Text>
        </View>

        <View className={style['modal-body']}>
          {props.wrongChars && props.wrongChars.length > 0 && (
            <View className={style['wrong-char-wrapper']}>
              <View className={style['wrong-char-title']}>
                <Text className={style['wrong-char-title-text']}>
                  错题项（{props.wrongChars.length} 个）/ 点击字母可听发音，💪 加油～
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
          <Text>FOOTER</Text>
        </View>
      </View>
    </View>
  );
};
