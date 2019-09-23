import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import { NavigatorButton } from '@/components/NavigatorButton';
import iconhome from '@/assets/icons/home.svg';

import style from './style.less';

export default () => {
  const vxUrl = 'https://code.aliyun.com/solidzoro/ipfs/raw/master/statics/images/vxqr.jpg';

  const onPreviewImage = () => Taro.previewImage({ urls: [vxUrl] }).then();

  return (
    <View className={style['wrapper']}>
      <NavigatorButton title="返回" url="/pages/study/study" image={iconhome} />

      <View className={style['wrapper-inner']}>
        <View className={style['header']}>
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <Text className={style['emoji']}>👋</Text>
          <Text className={style['title']}>HELLO，欢迎来到隐藏关卡</Text>
        </View>

        <View className={style['container']}>
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <Text className={style['memo-text']}>
            这个页面本来是预留着写开发日志的，但由于开发进度过于顺利（笑）导致没有什么内容可写，所以这里干脆变成了 About
            页。 如果你在使用过程中有遇到 BUG 、或有意见和建议，以及想要给我打赏 💰、想开发小程序、想请我喝杯咖啡、想……
            你都可以「自己想办法」通过下面的二维码与我联系 😹。
          </Text>

          <Image className={style['memo-image']} src={vxUrl} onClick={onPreviewImage} />

          <Text className={style['memo-text-tiny']}>其实是我懒，不想写 feedback 功能，哈哈哈哈～</Text>
        </View>

        <View className={style['footer']}>
          <Text className={style['version']}>Version 0.0.1</Text>
        </View>
      </View>
    </View>
  );
};
