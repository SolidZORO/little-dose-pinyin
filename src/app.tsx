import '@tarojs/async-await';
import Taro, { Component, Config } from '@tarojs/taro';

import 'array-flat-polyfill';
import '@/libs/promise-finally.lib';

import Search from '@/pages/study/study';

import '@/styles/global.less';

class App extends Component {
  config: Config = {
    // prettier-ignore
    pages: [
      'pages/study/study',
      'pages/exam/exam',
      'pages/history/history',
      'pages/about/about',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#f7f6e8',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'black',
    },
  };

  render() {
    return <Search />;
  }
}

Taro.render(<App />, document.getElementById('app'));
