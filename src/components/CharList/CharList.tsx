import Taro, { useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import cx from 'classnames';

import { IChar } from '@/interfaces';
import { voiceConfig } from '@/configs';
import { CharItem } from '@/components/CharItem';

import style from './style.less';

interface IProps {
  rowQuntity: any;
  charList: IChar[][];
  charTitle: string;
  selectedChar?: IChar;
  disablePlayer?: boolean;
  disableClick?: boolean;
  onSelectedCharCallback?: (i: IChar) => void;
}

export const CharList = (props: IProps) => {
  const onSelectedCharCallback = (i: IChar) => {
    if (props.onSelectedCharCallback) {
      props.onSelectedCharCallback(i);
    }
  };

  return (
    <View className={style['wrapper']}>
      <View className={style['char-title']}>{props.charTitle}</View>
      <View
        className={cx(style['char-keyboard'], {
          [style['char-keyboard--disable']]: props.disableClick,
        })}
      >
        {props.charList &&
          props.charList.map((rows, key) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <View key={`rows-${key}`} className={style['char-list']}>
                {rows &&
                  rows.map(i => (
                    <View key={i.char} className={style['char-item']}>
                      <CharItem
                        charItem={i}
                        rowQuntity={props.rowQuntity}
                        disablePlayer={props.disablePlayer}
                        disableClick={props.disableClick}
                        selectedChar={props.selectedChar}
                        onSelectedCharCallback={() => !props.disableClick && onSelectedCharCallback(i)}
                      />
                    </View>
                  ))}
              </View>
            );
          })}
      </View>
    </View>
  );
};
