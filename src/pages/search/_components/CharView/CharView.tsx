import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import { IChar } from '@/interfaces';
import { imageConfig } from '@/configs';

import style from './style.less';

interface IProps {
  selectedChar?: IChar;
}

export const CharView = (props: IProps) => {
  console.log(props.selectedChar && imageConfig[props.selectedChar.path]);

  return (
    <View className={style['wrapper']}>
      {props.selectedChar && (
        <View className={style['view-wrapper']}>
          <View className={style['image-wrapper']}>
            <Image
              className={style['image']}
              src={imageConfig[`img${props.selectedChar.path}`]}
              // width={64}
              // height={64}
            />
          </View>
          <View className={style['info-wrapper']}>
            <View className={style['text-char']}>
              <Text className={style['text-char-text']}>{props.selectedChar.char}</Text>
            </View>
            <View className={style['text-ch']}>
              <Text className={style['text-ch-text']}>{props.selectedChar.ch}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
