import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import style from './style.less';

interface IProps {
  examCharsLength: number;
  rightCharsLength: number;
  wrongCharsLength: number;
  paddingWidth?: number;
}

export const ExamResultTotal = (props: IProps) => {
  const styleProps = { padding: `0 ${props.paddingWidth || 6}px` };

  return (
    <View className={style['wrapper']}>
      <View className={style['right-and-wrong-info-text']} style={styleProps}>
        <Text className={style['right-and-wrong-info-text-label']}>共</Text>
        <Text className={style['right-and-wrong-info-text-number']}>{props.examCharsLength}</Text>
      </View>
      <View className={style['right-and-wrong-info-text']} style={styleProps}>
        <Text className={style['right-and-wrong-info-text-label']}>对</Text>
        <Text className={style['right-and-wrong-info-text-number']}>{props.rightCharsLength}</Text>
      </View>
      <View className={style['right-and-wrong-info-text']} style={styleProps}>
        <Text className={style['right-and-wrong-info-text-label']}>错</Text>
        <Text className={style['right-and-wrong-info-text-number']}>{props.wrongCharsLength}</Text>
      </View>
    </View>
  );
};
