import Taro, { useState } from '@tarojs/taro';
import { View, Text, Image, Navigator, Button } from '@tarojs/components';
import cx from 'classnames';

import { IChar } from '@/interfaces';
import { imageConfig, voiceConfig } from '@/configs';
import { NavigatorButton } from '@/components/NavigatorButton';

import iconreplay from '@/assets/icons/replay.svg';
import iconexam from '@/assets/icons/exam.svg';

import style from './style.less';

interface IProps {
  selectedChar?: IChar;
}

const playerCtx = Taro.createInnerAudioContext();

export const CharBanner = (props: IProps) => {
  const [playerStatus, setPlayerStatus] = useState<boolean>(false);

  const player = (src: string) => {
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

  const playChar = () => {
    if (props.selectedChar) {
      player(voiceConfig[`vc${props.selectedChar.path}`]);
    }
  };

  return (
    <View className={style['wrapper']}>
      <View className={style['wrapper-inner']}>
        <NavigatorButton title="去测试" url="/pages/exam/exam" image={iconexam} />

        {props.selectedChar && (
          <View className={style['view-wrapper']} onClick={() => playChar()}>
            <View className={style['icon-replay']}>
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
    </View>
  );
};
