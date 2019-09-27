import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import { NavigatorButton } from '@/components/NavigatorButton';
import { HistoryList } from '@/components/HistoryList';
import iconhome from '@/assets/icons/home.svg';

import style from './style.less';
import iconexam from '@/assets/icons/exam.svg';

export default () => {
  return (
    <View className={style['wrapper']}>
      <NavigatorButton
        title="返回"
        url="/pages/exam/exam"
        openType={Taro.getCurrentPages().length > 1 ? 'navigateBack' : 'navigate'}
        image={iconhome}
        buttonWrapperStyle={{ padding: '1px 15px 15px 15px' }}
      />

      <View className={style['wrapper-inner']}>
        <View className={style['header']}>
          <Image className={style['header-image']} src={iconexam} />
          <Text className={style['header-text']}>历史测试成绩</Text>
        </View>

        <View className={style['container']}>
          <HistoryList />
        </View>
      </View>
    </View>
  );
};
