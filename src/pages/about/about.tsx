/* eslint-disable jsx-a11y/accessible-emoji */

import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import { NavigatorButton } from '@/components/NavigatorButton';
import iconhome from '@/assets/icons/home.svg';
import { devlog } from '@/DEVLOG';

import style from './style.less';

export default () => {
  const vxUrl = 'https://code.aliyun.com/solidzoro/ipfs/raw/master/statics/images/vxqr.jpg';

  const onPreviewImage = () => Taro.previewImage({ urls: [vxUrl] }).then();

  return (
    <View className={style['wrapper']}>
      <NavigatorButton
        title="返回"
        openType={Taro.getCurrentPages().length > 1 ? 'navigateBack' : 'navigate'}
        url="/pages/study/study"
        image={iconhome}
        buttonWrapperStyle={{ padding: '1px 15px 15px 15px' }}
      />

      <View className={style['wrapper-inner']}>
        <View className={style['header']}>
          <Text className={style['emoji']}>👋</Text>
          <Text className={style['title']}>WELCOME</Text>
        </View>

        <View className={style['container-about']}>
          <Text className={style['memo-text']}>
            欢迎来到「关于」页面，如果你在使用过程中有遇到 BUG 、或有意见和建议，以及想要给我打赏
            💰、想开发小程序、想请我喝杯咖啡、想…… 你都可以「自己想办法」通过下面的二维码与我联系 😹。
          </Text>

          <Image className={style['memo-image']} src={vxUrl} onClick={onPreviewImage} />

          <Text className={style['memo-text-tiny']}>其实是我懒，不想写 feedback 功能，哈哈哈哈～</Text>
        </View>

        <View className={style['container-version']}>
          <Text className={style['container-version-text']}>Version 0.0.3</Text>
        </View>

        <View className={style['container-faq']}>
          <View className={style['faq-title']}>
            <Text>FAQ</Text>
          </View>

          <Text className={style['faq-text-q']}>Q：为什么要写这个小程序？</Text>

          <Text className={style['faq-text-a']}>
            初衷很简单，因为小朋友要用拼音工具，但是市面上无论{' '}
            App、小程序或是网页，我都找不到声母、韵母在同一屏幕上展示且可点击发音的工具，这意味着在查询声母、韵母时必须来回切换选项卡，导致效率低下。
            所以，我也只好自己写写看（笑）。
          </Text>

          <Text className={style['faq-text-q']}>Q：为什么选择了小程序平台？</Text>

          <Text className={style['faq-text-a']}>
            对于学习拼音这一需求，我认为 90% 的目标人群会是小朋友。而且对于小朋友的家长来说，其中一个刚需是断网可用{' '}
            🤣。这个需求在 App、小程序或是网页上都能实现， 只不过 App 发布审核麻烦，网页则是离线下缓存所有音频比较困难。
            并且考虑到拼音的特殊性，基本上都是国内小朋友在用，都有微信，所以小程序平台无疑是最好的选择。
          </Text>
        </View>

        <View className={style['container-devlog']}>
          <View className={style['devlog-title']}>
            <Text>DEVLOG</Text>
          </View>

          {Object.keys(devlog).map(key => (
            <View className={style['devlog-content']} key={key}>
              <View className={style['devlog-content-date']}>
                <Text className={style['devlog-content-symbol']}>#</Text>
                {key.replace('log-', '')}
              </View>
              <Text className={style['devlog-content-text']}>{devlog[key]}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
