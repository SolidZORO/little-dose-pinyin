import Taro from '@tarojs/taro';
import { Text, Button, View, Input } from '@tarojs/components';

export default class extends Taro.Component {
  componentDidMount() {
    Taro.setNavigationBarTitle({ title: '我的账户' }).then();
  }

  // componentDidShow() {
  //   if (typeof this.$scope.getTabBar === 'function' && this.$scope.getTabBar()) {
  //     this.$scope.getTabBar().$component.setState({
  //       selectedSlug: 'account',
  //     });
  //   }
  // }

  public render() {
    return (
      <View>
        <Text>Game</Text>
        <Input />
        <Button onClick={() => Taro.navigateTo({ url: '/' })}>Home</Button>
      </View>
    );
  }
}
