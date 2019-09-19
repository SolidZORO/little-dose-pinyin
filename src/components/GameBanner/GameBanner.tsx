import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import { IChar } from '@/interfaces';
import { imageConfig, charConfig } from '@/configs';

import style from './style.less';

interface IProps {
  selectedChar?: IChar;
}

export const GameBanner = (props: IProps) => {
  console.log(props.selectedChar && imageConfig[props.selectedChar.path]);

  return (
    <View className={style['wrapper']}>
      {props.selectedChar && <View className={style['view-wrapper']}>{JSON.stringify(props.selectedChar)}</View>}
    </View>
  );
};
