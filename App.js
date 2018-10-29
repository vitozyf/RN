import React, {Component} from 'react';
import { Provider } from 'react-redux';
import createStore from '@src/store';
import Pages from '@router/DrawerNavRouter';
import './Global';

import { 
  createStackNavigator, // 带标题
  createSwitchNavigator, // 全屏
  createDrawerNavigator, // 抽屉
  createBottomTabNavigator // 底部
} from 'react-navigation';

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Pages />
      </Provider>
    );
  }
}
