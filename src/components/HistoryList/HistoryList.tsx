import cx from 'classnames';
import dayjs from 'dayjs';
import Taro, { useState, useEffect } from '@tarojs/taro';
import { Text, View, Image } from '@tarojs/components';

import { IHistoryStorage } from '@/interfaces';
import style from './style.less';
import iconclock from '@/assets/icons/clock.svg';

export const HistoryList = () => {
  const [historyData, setHistoryData] = useState<IHistoryStorage[]>([]);

  useEffect(() => {
    const storageInfo = Taro.getStorageInfoSync();
    const nextHistoryData: IHistoryStorage[] = [];
    const historyKeys = storageInfo.keys.filter(k => k.includes('history-'));

    historyKeys.forEach(k => {
      const sdata = Taro.getStorageSync(k);

      if (sdata) {
        nextHistoryData.push(sdata);
      }
    });

    setHistoryData(nextHistoryData);
  }, []);

  const onOpenItem = () => {
    Taro.showToast({ icon: 'none', title: '目前此处暂无功能，下一版本这里会加入错题分析' }).then();
  };

  return (
    <View className={style['wrapper']}>
      <View className={style['history-wrapper']}>
        {historyData.map(storage => (
          <View key={storage.historyName} className={style['history-item-group']}>
            <View className={style['history-title']}>
              <Image className={style['history-title-image']} src={iconclock} />
              <Text className={style['history-title-text']}>
                {dayjs(storage.historyName.replace('history-', '')).format('YYYY-MM-DD')}
              </Text>
            </View>

            {storage.data.map(item => (
              <View
                key={item.timestamp}
                className={cx(style['history-item'], style[`history-item--${Taro.getEnv()}`])}
                onClick={onOpenItem}
              >
                <View
                  key={item.timestamp}
                  className={cx(
                    style['history-item-score'],
                    style[`history-item-score--${Taro.getEnv()}`],
                    style[`history-item-score--${item.score}`],
                  )}
                >
                  <Text className={style['history-item-score-number']}>{item.score}</Text>
                  <Text className={style['history-item-score-unit']}>分</Text>
                </View>
                <Text className={style['history-item-time']}>{dayjs(item.timestamp).format('HH:mm:ss')}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};
