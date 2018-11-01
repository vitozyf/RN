import React, {Component} from 'react';
import { Provider } from 'react-redux';
import createStore from '@src/store';
import Pages from '@router/DrawerNavRouter';
import './Global';
import {AppInit} from '@src/utils/appInit';

import { 
  createStackNavigator, // 带标题
  createSwitchNavigator, // 全屏
  createDrawerNavigator, // 抽屉
  createBottomTabNavigator // 底部
} from 'react-navigation';

const store = createStore();
// console.log(store)
export default class App extends Component {
  componentWillMount() {
    AppInit(store);
  }
  render() {
    return (
      <Provider store = { store }>
        <Pages />
      </Provider>
    );
  }
}
