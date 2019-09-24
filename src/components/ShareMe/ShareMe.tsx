import Taro from '@tarojs/taro';
import { Text, View, Button, Image } from '@tarojs/components';

import style from './style.less';
import iconshare from '@/assets/icons/share.svg';

export const ShareMe = () => {
  return (
    <View className={style['wrapper']}>
      <Button openType="share" className={style['share-button']}>
        <Image className={style['share-icon']} src={iconshare} />
        <Text className={style['share-text']} src={iconshare}>
          分享给好友
        </Text>
      </Button>
    </View>
  );
};
