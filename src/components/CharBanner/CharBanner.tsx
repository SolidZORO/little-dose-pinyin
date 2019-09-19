import Taro, { useState } from '@tarojs/taro';
import { View, Text, Image, Navigator, Button } from '@tarojs/components';
import cx from 'classnames';

import { IChar } from '@/interfaces';
import { imageConfig, voiceConfig } from '@/configs';

import iconreplay from '@/assets/icons/replay.svg';

import style from './style.less';

interface IProps {
  selectedChar?: IChar;
}

const playerCtx = Taro.createInnerAudioContext();

export const CharBanner = (props: IProps) => {
  console.log(props.selectedChar && imageConfig[props.selectedChar.path]);

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

  const rePlaye = () => {
    if (props.selectedChar) {
      player(voiceConfig[`vc${props.selectedChar.path}`]);
    }
  };

  return (
    <View className={style['wrapper']}>
      <View className={style['switch-page']}>
        <Navigator url="/pages/game/game">
          <Button size="mini" type="primary">
            游戏
          </Button>
        </Navigator>
      </View>

      {props.selectedChar && (
        <View className={style['view-wrapper']} onClick={() => rePlaye()}>
          <View className={style['icon-replay']} onClick={() => rePlaye()}>
            <Image
              className={cx(style['icon-replay-image'], {
                [style['icon-replay-image--action']]: playerStatus,
              })}
              src={iconreplay}
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

          <View className={style['image-wrapper']}>
            <Image
              className={style['image']}
              src={imageConfig[`img${props.selectedChar.img || props.selectedChar.path}`]}
            />
          </View>
        </View>
      )}
    </View>
  );
};
