import Taro, { useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import cx from 'classnames';

import { IChar } from '@/interfaces';
import { voiceConfig } from '@/configs';

import style from './style.less';

interface IProps {
  key: string;
  rowQuntity: any;
  charItem: IChar;
  selectedChar?: IChar;
  disablePlayer?: boolean;
  disableClick?: boolean;
  onSelectedCharCallback?: (i: IChar) => void;
}

const playerCtx = Taro.createInnerAudioContext();

export const CharItem = (props: IProps) => {
  const [playerStatus, setPlayerStatus] = useState<boolean>(false);

  const player = (src: string) => {
    if (playerStatus) {
      playerCtx.stop();
    }

    playerCtx.autoplay = true;
    playerCtx.loop = false;
    playerCtx.src = src;

    playerCtx.onPlay(() => {
      setPlayerStatus(true);
    });

    playerCtx.onEnded(() => {
      setPlayerStatus(false);
    });
  };

  const onSelectedCharCallback = (i: IChar) => {
    if (!props.disablePlayer) {
      player(voiceConfig[`vc${i.path}`]);
    }

    if (props.onSelectedCharCallback) {
      props.onSelectedCharCallback(i);
    }
  };

  return (
    <View
      key={props.charItem.char}
      className={cx(style['char-item'], {
        [style['char-item--row-quntity-6']]: props.rowQuntity === 6,
        [style['char-item--row-quntity-8']]: props.rowQuntity === 8,
        [style['char-item--active']]: props.selectedChar && props.charItem.char === props.selectedChar.char,
      })}
      onClick={() => !props.disableClick && onSelectedCharCallback(props.charItem)}
    >
      {props.charItem.char}
    </View>
  );
};
