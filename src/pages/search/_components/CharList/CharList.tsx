import Taro, { useState } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import cx from 'classnames';

import { IChar } from '@/interfaces';

import style from './style.less';

interface IProps {
  rowQuntity: any;
  charList: IChar[][];
  onSelectedCharCallback?: (i: IChar) => void;
}

export const CharList = (props: IProps) => {
  const [selectedChar, setSelectedChar] = useState<IChar>();

  const onSelectedCharCallback = (i: IChar) => {
    setSelectedChar(i);

    if (props.onSelectedCharCallback) {
      props.onSelectedCharCallback(i);
    }
  };

  return (
    <View className={style['wrapper']}>
      {props.charList &&
        props.charList.map((rows, key) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <View key={`rows-${key}`} className={style['char-list']}>
              {rows &&
                rows.map(i => (
                  <View
                    key={i.char}
                    className={cx(style['char-item'], {
                      [style['char-item--row-quntity-6']]: props.rowQuntity === 6,
                      [style['char-item--row-quntity-8']]: props.rowQuntity === 8,
                      [style['char-item--active']]: selectedChar && i.char === selectedChar.char,
                    })}
                    onClick={() => onSelectedCharCallback(i)}
                  >
                    <Text className={style['char-item-text']}>{i.char}</Text>
                  </View>
                ))}
            </View>
          );
        })}
    </View>
  );
};
