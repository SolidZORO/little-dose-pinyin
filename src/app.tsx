import '@tarojs/async-await';
import Taro, { Component, Config } from '@tarojs/taro';

import Search from '@/pages/study/study';
import '@/libs/promise-finally.lib';

import '@/styles/global.less';

class App extends Component {
  config: Config = {
    // prettier-ignore
    pages: [
      'pages/study/study',
      'pages/game/game',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'pinyin',
      navigationBarTextStyle: 'black',
    },
  };

  render() {
    return <Search />;
  }
}

Taro.render(<App />, document.getElementById('app'));
