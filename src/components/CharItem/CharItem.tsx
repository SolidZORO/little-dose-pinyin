import Taro, { useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import cx from 'classnames';

import { IChar } from '@/interfaces';
import { voiceConfig } from '@/configs';

import style from './style.less';

interface IProps {
  charItem: IChar;
  key?: string;
  rowQuntity?: number;
  selectedChar?: IChar;
  disablePlayer?: boolean;
  disableClick?: boolean;
  onSelectedCharCallback?: (i: IChar) => void;
}

const playerCtx = Taro.createInnerAudioContext();

export const CharItem = (props: IProps) => {
  const [playerStatus, setPlayerStatus] = useState<boolean>(false);

  const player = async (src: string) => {
    if (playerStatus) {
      playerCtx.stop();
    }

    playerCtx.autoplay = true;
    playerCtx.loop = false;
    playerCtx.src = src;
    playerCtx.play();

    playerCtx.onPlay(() => {
      setPlayerStatus(true);
    });

    playerCtx.onEnded(() => {
      setPlayerStatus(false);
    });
  };

  const onSelectedCharCallback = async (i: IChar) => {
    if (!props.disablePlayer) {
      await player(voiceConfig[`vc${i.path}`]);
    }

    if (props.onSelectedCharCallback) {
      props.onSelectedCharCallback(i);
    }
  };

  return (
    <View
      key={props.charItem.char}
      className={cx(style['char-item'], {
        [style['char-item--active']]: props.selectedChar && props.charItem.char === props.selectedChar.char,
      })}
      onClick={() => !props.disableClick && onSelectedCharCallback(props.charItem)}
    >
      {props.charItem.char}
    </View>
  );
};
