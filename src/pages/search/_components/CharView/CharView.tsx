import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import { IChar } from '@/interfaces';

import style from './style.less';
import { IconFont } from '@/components/IconFont';

interface IProps {
  selectedChar?: IChar;
}

export const CharView = (props: IProps) => {
  return (
    <View className={style['wrapper']}>
      {props.selectedChar && (
        <View className={style['view-wrapper']}>
          <View className={style['text-char']}>
            <Text className={style['text-char-text']}>{props.selectedChar.char}</Text>
          </View>
          <IconFont className={style['text-emoji']} type={props.selectedChar.char} size={64} />
        </View>
      )}
    </View>
  );
};
